"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {

  useEffect(() => {
    if (!localStorage.getItem('reloaded')) {
      window.location.reload();
      localStorage.setItem('reloaded', 'true');
    }
    console.log(localStorage.getItem('reloaded'));
  }, []);
  

  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Image 
          src="./icons/logo.svg"
          width={32}
          height={32}
          alt='Zoom logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Zoom</p>
      </Link>

      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar