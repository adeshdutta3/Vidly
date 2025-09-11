import CallList from '@/components/ui/CallList'
import React from 'react'

const Upcomming = () => {
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="text-3xl font-bold">
        Upcomming
      </div>
      <CallList type='upcomming' ></CallList>
    </section>
  )
}

export default Upcomming