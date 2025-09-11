'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from './textarea'
import ReactDatePicker from 'react-datepicker';
import { Input } from './input'


const Meetingtypelist = () => {
    const { toast } = useToast()
    const router = useRouter();
    const{user} = useUser();
    const client = useStreamVideoClient()
    const [calldetail,setcalldetail] = useState<Call>()
    const [meetingstate , setmeetingstate] =
     useState<'isSchedulemeeting'| 'isJoiningmeeting'|'isInstantmeeting'|undefined>(undefined);
    const [values,setvalues] = useState({
        dateTime : new Date(),
        description : '',
        link : ''
    });
    const meetingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetail?.id}`
    const createMeeting = async()=>{
       if(!client||!user) return; 
       try {
            if(!values.dateTime) {
                toast({
                    title: "Please endter a valid date and time for the meeting",
                })
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if(!call) throw new Error('Call doesnt exist');
            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description||'Instant Meeting'
            await call.getOrCreate({
                data : {
                    starts_at : startAt,
                    custom : {
                        description 
                    }
                }
            })
            setcalldetail(call);
            console.log(call.id);
            if(!values.description){
                
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: "Meeting Created",
            })
        } catch (error) {
        console.log(error);
        toast({
            title: "Failed to create meeting",
          })
       }

    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard  color='bg-orange-1' title='New Meeting' handleclick={()=>{setmeetingstate('isInstantmeeting')}}
         imgUrl='/icons/add-meeting.svg' description='Start at an instant'></HomeCard>
        <HomeCard color='bg-blue-1' title='Join Meeting' handleclick={()=>{setmeetingstate('isJoiningmeeting')}}
         imgUrl='/icons/join-meeting.svg' description='via invitation link'></HomeCard>
        <HomeCard color='bg-purple-1' title='Schedule Meeting' handleclick={()=>{setmeetingstate('isSchedulemeeting')}}
        imgUrl='/icons/schedule.svg' description='Plan your meeting'></HomeCard>
        <HomeCard color='bg-yellow-1' title='View Recordings' handleclick={()=>{router.push('/recordings')}}
        imgUrl='/icons/recordings.svg' description='Check out your recordings'></HomeCard>
        {!calldetail ? (
            <MeetingModal isOpen={meetingstate==='isSchedulemeeting'} onClose={()=>{setmeetingstate(undefined)}}
            title='Create Meeting'className ='text-center' 
            handleClick={createMeeting}>
                <div className='flex flex-col gap-2.5'>
                    <label>Add a description</label>
                    <Textarea onChange={(e)=>{
                        setvalues({...values , description : e.target.value});
                    }} className='bg-dark-3 border-none focus-visible:ring-0  focus-visible:ring-offset-0 '></Textarea>
                </div>
                <div className='flex w-full flex-col'>
                    <label>Select Date and Time</label>
                    <ReactDatePicker className='w-full rounded bg-dark-3 p-2 focus:outline-none' onChange={(date)=>{setvalues({...values,dateTime: date!})}} selected={values.dateTime} showTimeSelect timeFormat='HH:mm' timeIntervals={15} timeCaption='time' dateFormat={'MMMM d,yyyy,h:mm aa'} />
                </div>
            </MeetingModal>
        ):(
            <MeetingModal isOpen={meetingstate==='isSchedulemeeting'} onClose={()=>{setmeetingstate(undefined)}}
            title='Meeting Created' image ='/icons/checked.svg'
            buttonIcon = '/icons/copy.svg'  buttonText = 'Copy Meeting Link'  className ='text-center' 
            handleClick={()=>{
                navigator.clipboard.writeText(meetingUrl);
                toast({
                    title: "Link Copied",
                  })
            }}>
            </MeetingModal>
        )}
        <MeetingModal isOpen={meetingstate==='isInstantmeeting'} onClose={()=>{setmeetingstate(undefined)}}
        title='Start New Meeting' buttonText='Start Meeting' className ='text-center' 
        handleClick={createMeeting}></MeetingModal>
        <MeetingModal isOpen={meetingstate==='isJoiningmeeting'} onClose={()=>{setmeetingstate(undefined)}}
        title='Type the link here' buttonText='Join Meeting' className ='text-center' 
        handleClick={()=>{
            router.push(values.link);
        }}>
            <Input onChange={(e)=>{
                setvalues({...values,link :e.target.value})
            }} className='bg-dark-3 focus-visible:ring-offset-0 focus-visible:ring-0 border-none' placeholder='meeting link'></Input>
        </MeetingModal>
    </section>
  )
}

export default Meetingtypelist