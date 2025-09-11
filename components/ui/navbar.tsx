import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='flex justify-between z-50 items-center fixed top-0 w-full bg-dark-1 px-6 py-4 lg:px-10'>
        <Link href='/'className='flex items-center gap-2' >
            <Image src="/icons/logo.svg" alt='website-logo' width={40} height={40} ></Image>
            <p className='font-extrabold text-2xl text-white max-sm:hidden'>Vidly</p>
        </Link>
        <div className='flex justify-between items-center gap-5'>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <MobileNav></MobileNav>
        </div>
    </nav>
  )
}

export default Navbar