'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const Endforall = () => {
    const router = useRouter();
    const call = useCall();
    const {useLocalParticipant} = useCallStateHooks()
    const localparticipant = useLocalParticipant();
    const isMeetingOwner = call?.isCreatedByMe;
    if(!isMeetingOwner) return null;
  return (
    <div>
        <Button onClick={async()=>{
            await call.endCall();
            router.push('/');
        }} className='cursor-pointer rounded-2xl bg-red-500 px-4 py-2 hover:bg-red-400' >
            End Meeting
        </Button>
    </div>
  )
}

export default Endforall