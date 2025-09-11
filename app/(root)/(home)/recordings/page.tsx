import CallList from '@/components/ui/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="text-3xl font-bold">
        Recordings
      </div>
      <CallList type='recording'></CallList>
    </section>
  )
}

export default Recordings