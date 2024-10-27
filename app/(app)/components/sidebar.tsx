import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Compass, HeartHandshake, HelpCircle, Luggage, MessageCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'

function Sidebar() {
    return (
        <div className='hidden md:block bg-rose-100/40 h-full shadow-md'>
            <div className='h-32 flex items-center bg-gradient-to-tr from-rose-700 to-red-500 p-4'>
                <div className='flex items-center gap-3'>
                    <span className='px-3 hover:bg-primary text-primary-foreground rounded-full min-h-12 min-w-12 cursor-pointer flex items-center justify-center gap-2'>
                        <Avatar className='h-6 w-6'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>Priyanshu</p>
                    </span>
                    <span className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-full min-h-12 min-w-12 cursor-pointer flex items-center justify-center'>
                        <Compass className='w-6 h-6 text-white stroke-1' />
                    </span>
                    <span className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-full min-h-12 min-w-12 cursor-pointer flex items-center justify-center '>
                        <Luggage className='w-6 h-6 text-white stroke-1' />
                    </span>
                    <span className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-full min-h-12 min-w-12 cursor-pointer  flex items-center justify-center'>
                        <HelpCircle className='w-6 h-6 text-white stroke-1' />
                    </span>
                </div>
            </div>
            <div>
                <Tabs defaultValue="matches" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="matches" className='text-rose-900'>Matches</TabsTrigger>
                        <TabsTrigger value="message" className='text-rose-900'>Message</TabsTrigger>
                    </TabsList>
                    <TabsContent value="matches">
                        <div className='text-center p-5'>
                            <div className='flex justify-center'>
                                <HeartHandshake className='w-32 h-32 stroke-1 text-rose-700'/>
                            </div>
                            <p className='text-3xl font-semibold text-rose-700 mb-3'>
                                Start Matching
                            </p>
                            <p>Matches will appear here once you start to like people. You can message them directly from here when you&apos;re ready to spark up the conversation.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="message">
                    <div className='text-center p-5'>
                            <div className='flex justify-center'>
                                <MessageCircle className='w-32 h-32 stroke-1 text-rose-700'/>
                            </div>
                            <p className='text-3xl font-semibold text-rose-700 mb-3'>
                                Say hello
                            </p>
                            <p>Looking to strike up a conversation? When you match with others, you can send them a message under “Matches”</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Sidebar
