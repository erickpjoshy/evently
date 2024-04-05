'use client'
import { IEvent } from '@/lib/mongodb/database/modals/event.modal'
import { SignedIn, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import { SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import Checkout from './Checkout';

const CheckoutButton = ({event}:{event:IEvent} ) => {
    const closedEventFinished = new Date(event.endDateTime) < new Date();
    const hasEventFinished =new Date(event.endDateTime) < new Date();
    const {user} =useUser();
    const userId =user?.publicMetadata.userId as string
  return (
    <div className='flex items-center gap-3'>
        {/* cannot buy past events */}
        {
            hasEventFinished ?(
                <p className='p-2 text-red-400'>Sorry Tickets are no Longer Available</p>
            ) :
              (
                <>
               <SignedOut>
                <Button asChild className='button rounded-full' size="lg">
                    <Link href="/sign-in"
                    > Get Tickets</Link>
                </Button>
               </SignedOut>

               <SignedIn>
                <Checkout event ={event} userId= {userId}/>
               </SignedIn>
               </>
              )
            
        }
    </div>
  )
}

export default CheckoutButton