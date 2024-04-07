import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.action'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/mongodb/database/modals/order.modal'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async({searchParams}:SearchParamProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventPage = Number(searchParams?.eventsPage) || 1;

    const order = await getOrdersByUser({userId,page:ordersPage});
    const orderedEvents = order?.data.map((order :IOrder)=> order.event) || [];

    console.log(orderedEvents)
    const organizedEvent = await getEventsByUser({
        userId,page:eventPage})
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
                 <Collection data={orderedEvents}
                    emptyTitle="No Events Ticket Purchased "
                    emptyStateSubText="no Worries- plenty of Events  To Explore"
                    collectionType="My_Tickets"
                    limit={3}
                    page={ordersPage}
                    urlParamName='orderPage'
                    totalPages={order?.totalPages} /> 
            </section>
            {/* Evnt  */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between '>
                    <h3 className='h3-bold text-center sm:text-left '>Events Organized</h3>
                    <Button asChild size='lg' className='button hidden sm:flex'>
                        <Link href="/events/create">Create New Events</Link>
                    </Button>
                </div>
            </section>
            <section className='wrapper my-8'>
                {<Collection data={organizedEvent?.data}
                    emptyTitle="No Events Have been Cretaed "
                    emptyStateSubText="Go create Some now"
                    collectionType="Events_Organized"
                    limit={3}
                    page={eventPage}
                    urlParamName='eventsPage'
                    totalPages={organizedEvent?.totalPages} /> }
            </section>
      
        </>
    )
}

export default ProfilePage