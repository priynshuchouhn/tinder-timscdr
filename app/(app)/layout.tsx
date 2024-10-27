
import React from 'react'
import Sidebar from './components/sidebar'

function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='grid grid-cols-4 min-h-screen'>
           <Sidebar/>
            <div className='col-span-4 md:col-span-3 overflow-hidden p-4'>
                {children}
            </div>
        </div>
    )
}

export default AppLayout
