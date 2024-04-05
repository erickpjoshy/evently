'use client'

import React, { useTransition } from 'react'
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
import { IEvent } from '@/lib/mongodb/database/modals/event.modal'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { deleteEvent } from '@/lib/actions/event.action'

const DeleteConfirmation = ({eventId} : {eventId:string}) => {
const pathName= usePathname()
let[isPending,startTransition]= useTransition()
  return (
<AlertDialog>
  <AlertDialogTrigger>
    <Image src="/assets/icons/delete.svg" alt="delete" width={20} height={20}/>
  </AlertDialogTrigger>
  <AlertDialogContent className='bg-white'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure? you Want to Delete</AlertDialogTitle>
      <AlertDialogDescription className='p-regular-16 text-grey-600'>
        This action cannot be undone. This will permanently delete this event
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
      onClick={()=>startTransition(async()=>{
        await deleteEvent({eventId,path:pathName})
      })}>{isPending? 'Deleting...' :'Delete'}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteConfirmation