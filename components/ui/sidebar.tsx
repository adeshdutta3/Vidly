'use client'

import { sidebar } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export const Sidebar = () => {
    const pathname = usePathname();
    return (
        
        <section className='sticky top-0 left-0 flex flex-col justify-between h-screen w-fit p-6 pt-28 bg-dark-1 text-white max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-col gap-6'>
                {sidebar.map((link)=>{
                    const isActive = pathname===link.path;
                    return(
                        <Link href={link.path}
                        key={link.label}
                        className={cn('flex gap-4 items-center p-4 rounded-lg', {
                            'bg-blue-1': isActive
                        })}
                        >
                            <Image src={link.imgurl}
                            alt={link.label}
                            width={24}
                            height={24}

                            ></Image>
                            <p className='text-lg  font-semibold max-lg:hidden'>{link.label}</p>
                        </Link>
                        
                    )
                })}
            </div>
            
        </section>
    )
}
