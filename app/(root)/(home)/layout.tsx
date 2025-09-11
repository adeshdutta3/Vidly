

import Navbar from '@/components/ui/navbar'
import { Sidebar } from '@/components/ui/sidebar'
import React, { Children, ReactNode } from 'react'

const Homelayout = ({ children }:{ children : ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar></Sidebar>
        <div className=' flex min-h-screen flex-1 flex-col px-10 pb-6 pt-28 max-md:pb-14 sm:px-14'>
          {children}
          
        </div>
      </div>
      
    </main>
  )
}

export default Homelayout