import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useBackgroundFilters, useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import { useToast } from './ui/use-toast'
import Image from 'next/image'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showPaticipants, setShowPaticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();
  const path = usePathname();
  const { toast } = useToast();
  
  
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
  console.log(meetingLink);

  if(callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch(layout) {
      case 'grid':
        return <PaginatedGridLayout />
        
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left'/>
        
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition='right'/>
        
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[95%] max-h-[90%] mb-[5%]'>
          <CallLayout />
        </div>
        
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showPaticipants })}>
          <CallParticipantsList onClose={() => setShowPaticipants(false)}/>
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls onLeave={() => router.push('/')} />

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white'/>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                  setLayout(item.toLocaleLowerCase() as CallLayoutType)
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1'/>
              </div>
            )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowPaticipants((prev) => !prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'> 
              <Users size={20} className='text-white' />
            </div>
        </button>
        <div className='w-10 h-9 cursor-pointer hover:bg-[#4c535b] bg-[#19232d] flex justify-center align-middle rounded-2xl' onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
        }}>
          <Image
            src="/icons/share.svg"
            alt="share"
            width={25}
            height={25}
          />
        </div>
        <EndCallButton />

      </div>
    </section>
  )
}

export default MeetingRoom