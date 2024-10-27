import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Compass, HelpCircle, Luggage } from 'lucide-react'

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
        </div>
    )
}

export default Sidebar
