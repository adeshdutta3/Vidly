'use client'
import Loader from '@/components/ui/Loader';
import Meetingroom from '@/components/ui/Meetingroom';
import Meetingsetup from '@/components/ui/Meetingsetup';
import { useGetcall } from '@/hooks/usegetcallbyid';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Meeting = () => {
    const {id} = useParams();
    const router  = useRouter();
    const{user,isLoaded} = useUser();
    const [issetupcomplete, setissetupcomplete] = useState(false);
    if(!user)return ;
    const {call , isCallLoading} = useGetcall(id);
    if(!isLoaded || isCallLoading) return <Loader></Loader>;
    if (!call) return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  return (
    <section className='h-screen w-full'>
        <StreamCall call={call}>
            <StreamTheme>
                {!issetupcomplete ? (<Meetingsetup setissetupcomplete={setissetupcomplete} ></Meetingsetup>): (<Meetingroom />)}
            </StreamTheme>
        </StreamCall>
    </section>
  )
}

export default Meeting