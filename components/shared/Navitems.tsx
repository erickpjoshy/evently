'use client'
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

const Navitems = () => {
    const pathname= usePathname()
  return (
    <ul className='md:flex-between flex w-full gap-5 flex-col md:flex-row'>
        {
            headerLinks.map((link)=>{
                const isActive= pathname == link.route
                return (
                    <li className={`${isActive && 'text-primary-500'} flex-center whitespace-nowrap p-medium-16` }
                    key={link.route}>
                    <Link href={link.route} >{link.label}</Link>
                    </li>
                )
            })
        }
    </ul>
  )
}

export default Navitems