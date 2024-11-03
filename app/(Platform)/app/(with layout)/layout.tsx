
import React from 'react'
import Sidebar from './components/sidebar'
import Header from './components/header'

function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='grid grid-cols-4 h-screen overflow-hidden'>
            <Sidebar />
            <div className='col-span-4 md:col-span-3 overflow-hidden p-2 md:p-4'>
                <Header/>
                {children}
            </div>
        </div>
    )
}

export default AppLayout
