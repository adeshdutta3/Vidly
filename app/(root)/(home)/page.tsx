'use client'
import { useEffect, useState } from "react";
import Meetingtypelist from "@/components/ui/Meetingtypelist";



export default function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update immediately
    setNow(new Date());

    // Calculate how many ms remain until the next minute starts
    const msToNextMinute = (60 - now.getSeconds()) * 1000;

    // First timeout: trigger exactly at the next minute
    const timeout = setTimeout(() => {
      setNow(new Date());

      // Then set an interval every minute
      const interval = setInterval(() => {
        setNow(new Date());
      }, 60 * 1000);

      // Cleanup interval when unmounted
      return () => clearInterval(interval);
    }, msToNextMinute);

    return () => clearTimeout(timeout);
  }, [now]);

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata",
  }).format(now);
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="w-full h-[300px] rounded-[20px] bg-hero bg-cover">
        <div className="h-full w-full flex flex-col justify-between max-md:px-5 max-md:py-8 max-lg:p-9 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded-sm py-2 text-center text-base font-normal ">
            Upcomming Meeting at : 12:30 PM</h2>
            <div className="flex gap-2 flex-col ">
              <h1 className="text-5xl font-extrabold lg:text-6xl">{time}</h1>
              <p className="text-md font-medium text-sky-1 lg:text-2xl">{date}</p>
            </div>
        </div>
      </div>
      <Meetingtypelist />
    </section>
  );
}
