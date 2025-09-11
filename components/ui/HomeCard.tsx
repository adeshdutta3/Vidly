'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const HomeCard = (props:{color:string , imgUrl:string , title :string , description : string, handleclick: ()=>void }) => {
  return (
    <div className={cn('w-full xl:max-w-[270px] cursor-pointer py-6 px-4 flex flex-col justify-between min-h-[260px] rounded-[14px]', props.color)}
     onClick={props.handleclick}> 
        <div className='flex-center glassmorphism size-12 rounded-[10px]'>
            <Image src={props.imgUrl} width={27} height={27} alt={props.title}></Image>
        </div>
        <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>{props.title}</h1>
            <p className='text-lg font-normal'>{props.description}</p>
        </div>

    </div>
  )
}

export default HomeCard