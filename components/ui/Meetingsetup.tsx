import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import { Switch } from "@/components/ui/switch"

const Meetingsetup = ({setissetupcomplete}:{setissetupcomplete : (a:boolean)=> void }) => {
    const [ismickCamToggledOn, setismickCamToggledOn] = useState(true);
    const call = useCall();
    if(!call) throw new Error ('Call must be used within streamCall component');
    useEffect(()=>{
        if(!ismickCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        }else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    },[ismickCamToggledOn ,call?.camera ,call?.microphone ])
  return (
    <div className='flex h-screen w-full flex-col items-center gap-3 justify-center text-white'>
        <h1 className='text-2xl font-bold'> SetUp </h1>
        <VideoPreview></VideoPreview>
        <div className='flex justify-between items-center gap h-16 gap-3'>
            <div className='flex items-center justify-center gap-2 font-medium'>
                {/* <Switch className='text-white' /> */}
                <Switch className='bg-dark-1 text-white' checked={ismickCamToggledOn} onCheckedChange={()=>{
                    setismickCamToggledOn(!ismickCamToggledOn);
                }} />
                Join With mic and camera
            </div>
            <DeviceSettings></DeviceSettings>
        </div>
        <Button className='rounded-md bg-blue-1 hover:border-2 hover:border-white hover:scale-105 transition-transform duration-200 ' onClick={()=>{
            call.join()
            setissetupcomplete(true);
        }}>Join Meeting</Button>
    </div>
  )
}

export default Meetingsetup