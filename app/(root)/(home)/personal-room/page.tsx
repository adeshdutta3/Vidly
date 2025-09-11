'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useGetcall } from '@/hooks/usegetcallbyid'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



const Table =({title, description}:{ title:string , description:string})=>{
  return <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-2xl xl:min-w-32' >{title}</h1>
    <h1 className='truncate text-sm font-bold lg:text-xl max-sm:max-w-[300px]'>
      {description}
    </h1>
  </div>
}

const Personal = () => {
  const {user} = useUser();
  const meetingId = user?.id||'';
  const {toast} = useToast();
  const client = useStreamVideoClient();
  const{call} = useGetcall(meetingId!);
  const [values,setvalues] = useState({
      dateTime : new Date(),
      description : '',
      link : ''
  });
  const router = useRouter()
  const meetingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`;
    const newMeetingRoom=async ()=>{
      if(!client||!user) return; 
      try {
            if(!values.dateTime) {
                toast({
                    title: "Please endter a valid date and time for the meeting",
                })
                return;
            }
            const id = meetingId;
            const newCall = client.call("default", meetingId!);
            if (!call) {
              await newCall.getOrCreate({
                data: {
                  starts_at: new Date().toISOString(),
                },
              });
            }
            router.push(`/meeting/${meetingId}`)
            toast({
                title: "Personal Meeting Created",
            })
        } catch (error) {
        console.log(error);
        toast({
            title: "Failed to create meeting",
          })
      }
    
    }
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="text-3xl font-bold">
        Personal Meeting Room
      </div>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic :' description={`${user?.username}'s meeting room`}></Table>
        <Table title='Meeting ID :' description={meetingId}></Table>
        <Table title='Invite Link :' description={meetingUrl}></Table>
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-1' onClick={newMeetingRoom}>
          Start Meeting
        </Button>
        <Button onClick={()=>{
          navigator.clipboard.writeText(meetingUrl);
          toast({
            title: "Link Copied",
          })
        }} className='bg-dark-3'>
          <Image height={20} width={20} src='/icons/copy.svg' alt='copy-personal-meeting' ></Image>
          <label >Copy Link</label>
        </Button>
      </div>
    </section>
  )
}

export default Personal