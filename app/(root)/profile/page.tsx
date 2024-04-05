import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.action'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async() => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const organizedEvent = await getEventsByUser({
        userId,page:1})
    return (
        <>
        {/* my tickets */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between '>
                    <h3 className='h3-bold text-center sm:text-left '>My Tickets</h3>
                    <Button asChild size='lg' className='button hidden sm:flex'>
                        <Link href="/#events">Explore More Events</Link>
                    </Button>
                </div>
            </section>
            <section className='wrapper my-8'>
                {/* <Collection data={events?.data}
                    emptyTitle="No Events Ticket Purchased "
                    emptyStateSubText="no Worries- plenty of Events  To Explore"
                    collectionType="My_Tickets"
                    limit={3}
                    page={1}
                    urlParamName='orderPage'
                    totalPages={2} /> */}
            </section>
            {/* Evnt  */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between '>
                    <h3 className='h3-bold text-center sm:text-left '>Events Organized</h3>
                    <Button asChild size='lg' className='button hidden sm:flex'>
                        <Link href="/event/create">Create New Events</Link>
                    </Button>
                </div>
            </section>
            <section className='wrapper my-8'>
                {<Collection data={organizedEvent?.data}
                    emptyTitle="No Events Have been Cretaed "
                    emptyStateSubText="Go create Some now"
                    collectionType="Events_Organized"
                    limit={3}
                    page={1}
                    urlParamName='eventsPage'
                    totalPages={2} /> }
            </section>
      
        </>
    )
}

export default ProfilePage