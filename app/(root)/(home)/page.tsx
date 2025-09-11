import { Button } from "@/components/ui/button";
import MeetingCard from "@/components/ui/MeetingCard";
import Meetingtypelist from "@/components/ui/Meetingtypelist";
import Image from "next/image";



export default function Home() {
  const now = new Date();
  const time = now.toLocaleTimeString('IST', { hour:'2-digit', minute : '2-digit'});
  const date = (new Intl.DateTimeFormat('IST',{dateStyle : 'full'})).format(now);
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
