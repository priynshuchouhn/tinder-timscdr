'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';


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
  birthdate: z.date({
    required_error: "Please select a date of birth",
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 0 && age <= 120
  }, {
    message: "Date of birth must be between 0 and 120 years ago",
  }),
  photos: z.array(z.string()).min(2, "Upload at least 2 photos").max(6, "Maximum 6 photos allowed"),
})



function OnBoarding() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>(Array(6).fill(""))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "male",
      interested_in: "female",
      birthdate: new Date('2024-11-03'),
      photos: [],
    }
  })
  const { isSubmitting, isValid } = form.formState;
  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {


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
        setPhotos((prev:string[]) => {
          const newPhotos = [...prev]
          newPhotos[index] = url
          return newPhotos
        })
      }
      form.setValue('photos', photos.filter(Boolean))
    };
    
    if (file) {
      reader.readAsDataURL(file); // Read the file as base64
    }
  }
  return (
    <div className='min-h-screen p-6 flex justify-center items-center'>
      <div className='basis-3/4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)} className='grid grid-cols-2 gap-4 mt-8'>
          <div className='space-y-8'>
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
            <div className="grid grid-cols-2 gap-4 w-full items-end">
              <FormField control={form.control} name='birthdate' render={({ field }) => (
                <FormItem>
                  <FormLabel className='block'>
                    Birthday
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MMMM d, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className='w-full'
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
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
              <Button type='submit' disabled={!isValid || isSubmitting}>Continue</Button>
            </div>
          </div>
          <div>
          <h2 className="text-sm font-semibold">Profile photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    <Card className={`relative aspect-[3/4] overflow-hidden ${
                      photo ? '' : 'border-2 border-dashed border-gray-600'
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
