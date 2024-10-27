import { Flame } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className="w-full md:hidden flex items-center justify-between p-3 shadow-sm h-14 fixed top-0 z-30 bg-white">
            <div className="flex items-end gap-1 text-rose-800">
                <Flame className="w-10 h-10 text-rose-800 fill-rose-800" />
                <p className="text-3xl">for <span className="italic font-semibold">TIMSDCR</span></p>
            </div>
        </div>
  )
}

export default Header
