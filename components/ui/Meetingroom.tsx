import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Endforall from './Endforall';
import Loader from './Loader';
import { toast } from '@/hooks/use-toast';

type calllayouttype = 'grid' | 'speaker-left' | 'speaker-right';
const Meetingroom = () => {
  const call = useCall();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonal = !!searchParams.get('personal')
  const [layout, setlayout] = useState<calllayouttype>('speaker-right');
  const [showparticipant, setshowparticipant] = useState(false)
  const {useCallCallingState} = useCallStateHooks();
  const callingstate = useCallCallingState();
  const [onejoin, setonejoin] = useState(false);
  if(callingstate == CallingState.JOINED && !onejoin) setonejoin(true);
  if(callingstate !== CallingState.JOINED){
    if(onejoin) 
      {router.push('/');
      toast({
        title: "Meeting Ended",
      })
    }
    else return <Loader></Loader>
  }
  const Layouttype = ()=>{
    switch(layout){
      case('grid'):{
        return <PaginatedGridLayout></PaginatedGridLayout>
      }
      case('speaker-right'):{
        return <SpeakerLayout participantsBarPosition='left' ></SpeakerLayout>
      }
      default:{
        return <SpeakerLayout participantsBarPosition='right' ></SpeakerLayout>
      }
    }
  }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <Layouttype></Layouttype>
        </div>
        <div className={cn('h-full hidden ml-2',{'show-block':showparticipant})}>
          <CallParticipantsList onClose={()=>{
            setshowparticipant(false)
          }}></CallParticipantsList>
        </div>
        <div className='fixed bottom-0 flex items-center justify-center gap-5 w-full flex-wrap '>
          <CallControls></CallControls>
          <div >
            <DropdownMenu>
              <div className='flex items-center'>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                <LayoutList size={20} className='text-white'></LayoutList>
              </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className='bg-dark-1 text-white'>
                {['Grid','Speaker-Left','Speaker-Right'].map((item , index)=>(
                  <div key={index} >
                    <DropdownMenuItem className='cursor.pointer' onClick={()=>{
                      setlayout(item.toLowerCase() as calllayouttype)
                    }}>{item}</DropdownMenuItem>
                    <DropdownMenuSeparator className='border-dark-1'/>

                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <CallStatsButton ></CallStatsButton>
        <button className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]' onClick={()=>{
            setshowparticipant(!showparticipant)
          }}>
            <Users></Users>
        </button>
        {!isPersonal && <Endforall></Endforall>}
        </div>
        
      </div>
    </section>
  )
}

export default Meetingroom