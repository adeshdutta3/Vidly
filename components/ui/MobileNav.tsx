'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { sidebar } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
  

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section className='w-full max-w-[260px] sm:hidden'>
        <Sheet> 
            <SheetTrigger asChild>
                <Image src={'/icons/hamburger.svg'} alt='hamburger icon' width={32} height={32} className='sm:hidden'></Image>
            </SheetTrigger>
            <SheetContent side={'left'} className='w-fit pr-10 h-full border-none bg-dark-1 text-white'>
                <section className='flex flex-col size-full bg-dark-1 text-white '>
                    <Link href='/'className='flex items-center gap-2' >
                        <Image src="/icons/logo.svg" alt='website-logo' width={40} height={40} ></Image>
                        <p className='font-bold text-lg text-white '>Vidly</p>
                    </Link>
                    <SheetClose asChild >
                        <section className='flex flex-col pt-16 gap-6'>
                            {sidebar.map((link)=>{
                                const isActive = pathname===link.path;
                                return(
                                    <SheetClose asChild key={link.label}>
                                        <Link href={link.path}
                                        key={link.label}
                                        className={cn('flex w-full max-w-60 gap-4 items-center p-4 rounded-lg', {
                                            'bg-blue-1': isActive
                                        })}
                                        >
                                            <Image src={link.imgurl}
                                            alt={link.label}
                                            width={20}
                                            height={20}

                                            ></Image>
                                            <p className='text-md font-medium '>{link.label}</p>
                                        </Link>
                                    </SheetClose>
                                    
                                )
                            })}
                        </section>
                    </SheetClose>
                    
                </section>
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav