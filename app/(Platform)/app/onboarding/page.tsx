'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PlusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveUser } from '@/lib/queries/save-user';
import { useAuth } from '@clerk/nextjs';


const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: "Please select a gender.",
  }),
  interested_in: z.enum(['male', 'female', 'other'], {
    required_error: "Please select a gender.",
  }),
  email: z.string().min(1, {
    message: 'Email is required'
  }).email({
    message: 'Email is not valid'
  }),
  day: z.string().refine((val) => {
    const day = parseInt(val, 10)
    return day >= 1 && day <= 31
  }, {
    message: 'Day must be between 1 and 31',
  }),
  month: z.string().refine((val) => {
    const month = parseInt(val, 10)
    return month >= 1 && month <= 12
  }, {
    message: 'Month must be between 1 and 12',
  }),
  year: z.string().refine((val) => {
    const year = parseInt(val, 10)
    const currentYear = new Date().getFullYear()
    return year >= 1900 && year <= currentYear
  }, {
    message: `Year must be between 1900 and ${new Date().getFullYear()}`,
  }),
  photos: z.array(z.string()).min(2, "Upload at least 2 photos").max(6, "Maximum 6 photos allowed"),
})



function OnBoarding() {
  const router = useRouter();
  const userId = useAuth().userId
  const [photos, setPhotos] = useState<string[]>(Array(6).fill(""))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: "",
      email: "",
      gender: "male",
      interested_in: "female",
      day: '3',
      month: '11',
      year: '2004',
      photos: [],
    }
  })
  const { isSubmitting, isValid, errors, validatingFields } = form.formState;
  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      Object.assign(values, {userId})
      await saveUser(values);
      toast.success('saved');
      router.push('/app/recs');
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    const reader = new FileReader();
    reader.onloadend = async () => {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: reader.result }),
      });

      const data = await res.json();
      if (data.url) {
        // console.log('Image uploaded:', data.url);
        const url = data.url; //URL.createObjectURL(file)
        const newPhotos = [...photos]
        newPhotos[index] = url
        setPhotos(newPhotos)
        form.setValue('photos', newPhotos.filter(Boolean));
      }
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as base64
    }
  }
  return (
    <div className='min-h-screen p-6 flex justify-center items-center'>
      <div className='basis-full md:basis-3/4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)} className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
            <div className='space-y-8 order-2 md:order-1'>
              <FormField control={form.control} name='name' render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder='e.g. Priynshu' {...field} />
                  </FormControl>
                  <FormDescription>
                    We will call you by this name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name='email' render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder='e.g. priynshuchouhn@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-end">
                <div className='grid grid-cols-3 gap-2'>
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={31} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={month.toString()}>
                                {format(new Date(2000, month - 1, 1), 'MMM')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" min={1900} max={new Date().getFullYear()} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField control={form.control} name='gender' render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="justify-start"
                      >
                        <ToggleGroupItem value="male" aria-label="Male" size={'sm'} className="px-3 py-1">
                          Male
                        </ToggleGroupItem>
                        <ToggleGroupItem value="female" aria-label="Female" size={'sm'} className="px-3 py-1">
                          Female
                        </ToggleGroupItem>
                        <ToggleGroupItem value="other" aria-label="Other" size={'sm'} className="px-3 py-1">
                          Other
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div>
                <FormField control={form.control} name='interested_in' render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Interested In
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="justify-start"
                      >
                        <ToggleGroupItem value="male" aria-label="Male" size={'sm'} className="px-3 py-1">
                          Male
                        </ToggleGroupItem>
                        <ToggleGroupItem value="female" aria-label="Female" size={'sm'} className="px-3 py-1">
                          Female
                        </ToggleGroupItem>
                        <ToggleGroupItem value="other" aria-label="Other" size={'sm'} className="px-3 py-1">
                          Other
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className='flex items-center gap-x-2'>
                {Object.values(errors).map((error, index) => (
                  <p key={index} className="error">{error.message}</p>
                ))}
              </div>
              <div className='flex items-center gap-x-2'>
                <Button type='submit' disabled={!isValid || isSubmitting}>Continue</Button>
              </div>
            </div>
            <div className='order-1 md:order-2'>
              <h2 className="text-sm font-semibold">Profile photos</h2>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                {photos.map((photo: string, index: number) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name="photos"
                    render={() => (
                      <FormItem>
                        <FormLabel htmlFor={`photo-${index}`} className="sr-only">
                          Photo {index + 1}
                        </FormLabel>
                        <Card className={`relative aspect-[3/4] overflow-hidden ${photo ? '' : 'border-2 border-dashed border-gray-600'
                          }`}>
                          <input
                            type="file"
                            id={`photo-${index}`}
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handlePhotoChange(e, index)}
                          />
                          <label
                            htmlFor={`photo-${index}`}
                            className="block w-full h-full cursor-pointer"
                          >
                            {photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={photo}
                                alt={`Profile photo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <PlusCircle className="w-10 h-10 text-red-500" />
                              </div>
                            )}
                          </label>
                        </Card>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 text-start mt-5">
                Upload 2 photos to start. Add 4 or more to make your profile stand out.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default OnBoarding
