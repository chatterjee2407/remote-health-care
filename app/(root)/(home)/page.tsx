'use client';

import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  
  const date = new Intl.DateTimeFormat("en-US", { 
    dateStyle: "full",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
  }).format(currentTime);
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList/>
    </section>
  );
};

export default Home;
