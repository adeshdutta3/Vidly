
'use client'
import { useGetCall } from '@/hooks/useGetcalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from '@/hooks/use-toast';

const CallList = ({type}:{type : 'upcomming' | 'ended' | 'recording'}) => {
    const{endedCalls,upcomingCalls,callRecordings,isLoaded} = useGetCall();
    const [isrecordings, setisrecordings] = useState<CallRecording[]>([]);
    const router = useRouter();
    const {toast} = useToast();
    const getCalls = ()=>{
        switch(type){
            case 'upcomming':
                return upcomingCalls;
            case 'ended':
                return endedCalls;
            case 'recording':
                return isrecordings;
            default:
                return [];
        }
    }
    const getnocallsmessage = ()=>{
        switch(type){
            case 'upcomming':
                return 'No Upcomming Calls';
            case 'ended':
                return 'No Ended Calls';
            case 'recording':
                return 'No Recordings Availaible';
            default:
                return '';
        }
    }
    
    try {
        useEffect(() => {
            const fetchRecordings = async () => {
              try {
                const callData = await Promise.all(
                    callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
                );
                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);
            
                setisrecordings(recordings);
              } catch (error) {
                toast({
                    title:'Try Again Later'
                })
              }
            };
        
            if (type === 'recording') {
              fetchRecordings();
            }
          }, [type, callRecordings]);
    } catch (error) {
        toast({
            title:'Try Again Later'
        })
    }
    const calls = getCalls();
    const nocallsmessage = getnocallsmessage();
    if(isLoaded) return <Loader></Loader>
  return (
    <div className=' relative grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls&&calls.length>0 ? calls.map((meeting: Call | CallRecording)=>{
            return (
                <MeetingCard 
                key={(meeting as Call).id}
                icon={
                    type ==='ended' ?
                    '/icons/previous.svg'
                    :type ==='upcomming'?
                    '/icons/upcoming.svg' :
                    '/icons/recordings.svg'

                }
                title={(meeting as Call).state?.custom?.description?.substring(0,25)||(meeting as CallRecording).filename?.substring(0,20)||'Personal-Meeting'}
                date={(meeting as Call).state?.startsAt?.toLocaleString()|| (meeting as CallRecording).start_time.toLocaleString()}
                isPreviousMeeting={ type === 'ended'}
                buttonIcon1={type==='recording'? '/icons/play.svg': undefined}
                buttonText={type==='recording'? 'Play': 'Start'}
                link={type==='recording'? (meeting as CallRecording).url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
                handleClick={type==='recording'? ()=>{router.push(`${(meeting as CallRecording).url}`)}: ()=>{
                    router.push(`/meeting/${(meeting as Call).id}`)
                }}
                />
            )
        }):  
            <div >{nocallsmessage}</div>

        }
    </div>
  )
}

export default CallList