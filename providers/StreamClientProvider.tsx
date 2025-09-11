'use client'
import { tokenProvider } from "@/actions/stream.action";
import Loader from "@/components/ui/Loader";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import {
    StreamVideo,
    StreamVideoClient,
  } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
  
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ;
  
const StreamVideoProvider = ({children}:{children:ReactNode}) => {
  const {toast} = useToast();
    const {user,isLoaded} = useUser();
    const [videoClient , setvideoClient] = useState <StreamVideoClient>();
  try{
    useEffect(()=>{
        if(!user||!isLoaded) return;
        if(!apiKey) throw new Error('Stream api key missing');
        const client = new StreamVideoClient({apiKey, user:{
            id: user?.id,
            name:user?.username|| user?.id,
            image:user?.imageUrl,
        },
        tokenProvider
        
        })
        setvideoClient(client);
    },[user,isLoaded])
  }catch(error){
    toast({
      title : 'Unable to fetch token',
      description:'Reload the page'
    })
  }
    if(!videoClient) {
        return <Loader></Loader>
    }
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };
  export default StreamVideoProvider;