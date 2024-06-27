'use client'

import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useUser } from '@clerk/nextjs';
import React from 'react'

function Home() {

  const { upcomingCalls } = useGetCalls();
  const getCalls = () => {
    return upcomingCalls;
  };
  const calls = getCalls();
  const todayCalls = calls.filter((call) => {
    return call?.state?.startsAt?.toLocaleDateString() === new Date().toLocaleDateString()
  }).map((call) => {
    return call?.state?.startsAt?.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})
  })

  const { user } = useUser();
  console.log(user?.emailAddresses[0].emailAddress);
  
  const time = new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('vi-VN', {dateStyle: 'full'})).format(new Date())

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal'>
            {calls && calls.length > 0 && todayCalls[0] !== undefined  ? 'Cuộc họp gần nhất lúc: ' + todayCalls[0] : 'Hôm nay không có cuộc họp nào.'}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home