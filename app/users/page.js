'use client'
import Navbar from '@/components/garmentTab'
import { Input } from '@/components/ui/input'
import { IoSearch } from 'react-icons/io5'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Button } from '@/components/ui/button'
import NewCustomerForm from '@/components/newCustomerForm'
import MeasurementForm from '@/components/measurementForm'
import { useState } from 'react'

export default function Page() {
  return (
    <div className="pt-24 flex gap-4 flex-col items-center text-center">
      <SearchBar />
      <CustomerList />
    </div>
  )
}

export function CustomerList() {
  const [garment, setGarment] = useState('Pant')
  const customerList = [
    {
      fname: 'Suresh',
      lname: 'Patel',
      garment: [
        {
          pant: {
            Collar: 25,
            Cuff: 30,
            Biceps: 30,
            Forearm: 30,
            SleeveLength: 30,
            FrontWidthWaist: 30,
            Chest: 30,
            Collar: 30,
          },
        },
        {
          shirt: {
            Collar: 25,
            Cuff: 30,
            Biceps: 30,
            Forearm: 30,
            SleeveLength: 30,
            FrontWidthWaist: 30,
            Chest: 30,
            Collar: 30,
          },
        },
      ],
    },
    {
      fname: 'Mukesh',
      lname: 'Parmar',
      garment: [
        {
          pant: {
            Collar: 25,
            Cuff: 30,
            Biceps: 30,
            Forearm: 30,
            SleeveLength: 30,
            FrontWidthWaist: 30,
            Chest: 30,
            Collar: 30,
          },
        },
        {
          shirt: {
            Collar: 25,
            Cuff: 30,
            Biceps: 30,
            Forearm: 30,
            SleeveLength: 30,
            FrontWidthWaist: 30,
            Chest: 30,
            Collar: 30,
          },
        },
      ],
    },
  ]
  return (
    <Accordion type="single" collapsible className="w-full">
      {customerList.map((customer) => (
        <AccordionItem
          value={customer.fname}
          key={customer.fname}
          {...customer}
        >
          <AccordionTrigger>
            {customer.fname} {customer.lname}
          </AccordionTrigger>

          <AccordionContent>
            <Navbar />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function SearchBar() {
  return (
    <div className="flex w-full  items-center space-x-2">
      <Input type="text" placeholder="Customer" />
      <Button type="submit">
        <IoSearch size={24} />
      </Button>

      {/* <NewCustomerForm /> */}
    </div>
  )
}
