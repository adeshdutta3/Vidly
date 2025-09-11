import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetcall = (id :String | String[])=>{
    const [call, setCall] = useState<Call>();
  const [isCallLoading, setisCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;
    
    const loadCall = async () => {
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) setCall(calls[0]);
        if(!call) throw new Error('call not present in hook1');
        setisCallLoading(false);
      } catch (error) {
        console.error(error);
        setisCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);
  return { call, isCallLoading };

}