'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant &&
  call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

  if(!isMeetingOwner) return null;

  return (
      <AlertDialog>
        <AlertDialogTrigger 
          className='bg-red-500 text-white pl-[16px] pr-[16px] pt-[8px] pb-[8px] rounded-lg'
        >
          End call for everyone
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-dark-5 border-gray-800'>
          <AlertDialogHeader>
            <AlertDialogTitle 
              className='text-white'
            >
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-white'>
              This action will end call for everyone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='text-white border-gray-800'>Cancel</AlertDialogCancel>
            <AlertDialogAction className='text-black bg-white' onClick={ async () => {
              await call.endCall();
              router.push('/');
            }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        // await call.endCall();
        // router.push('/');
  )
}

export default EndCallButton