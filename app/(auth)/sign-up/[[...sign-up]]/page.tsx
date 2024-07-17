"use client"

import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  if(localStorage.getItem('reloaded') === undefined) {
    return;
  } else {
    localStorage.removeItem('reloaded');
  }

  return (
    <main className='flex h-screen w-full items-center justify-center'>
        <SignUp />
    </main>
  )
}

export default SignUpPage