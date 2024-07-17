'use client'

import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Home() {
  const { user } = useUser();
  const router = useRouter();
  if(!user) {
    router.push('/sign-in');
  }

  useEffect(() => {
    if (!localStorage.getItem('reloaded')) {
      window.location.reload();
      localStorage.setItem('reloaded', 'true');
    }
    console.log(localStorage.getItem('reloaded'));
  }, []);

  const { upcomingCalls } = useGetCalls();

  const getCalls = () => {
    return upcomingCalls;
  };

  const calls = getCalls();
  const todayCalls = calls.filter((call) => {
    return call?.state?.startsAt?.toLocaleDateString() === new Date().toLocaleDateString()
  }).map((call) => {
    return call?.state?.startsAt?.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
  }).sort();
  
  const time = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format(new Date());

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 max-lg:p-11 lg:p-11'>
          <h2 className='glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal'>
            {calls && calls.length > 0 && todayCalls[0] !== undefined  ? 'Latest meeting at: ' + todayCalls[0] : 'There are no meetings today.'}
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