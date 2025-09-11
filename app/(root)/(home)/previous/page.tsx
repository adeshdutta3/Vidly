import CallList from '@/components/ui/CallList'
import React from 'react'

const Previous = () => {
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="text-3xl font-bold">
        Previous
      </div>
      <CallList type='ended'></CallList>
    </section>
  )
}

export default Previous