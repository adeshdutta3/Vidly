import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Signin = () => {
  return (
    <div className='flex h-screen justify-center items-center'><SignIn></SignIn></div>
  )
}

export default Signin