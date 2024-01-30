"use client";
import GarmentTab from "@/components/garmentTab";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

import { IoSearch } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getCustomers } from "../utils";
export default function Page() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCustomers = await getCustomers();
        setCustomers(fetchedCustomers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pt-24 flex gap-4 flex-col items-center text-center">
      <SearchBar />{" "}
      {isLoading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p>Error fetching customers: {error.message}</p>
      ) : (
        <CustomerList customers={customers} />
      )}
    </div>
  );
}

export function CustomerList({ customers }) { 
  return (
    <Accordion type="single" collapsible className="w-full">
      {customers.map((customer) => (
        <AccordionItem
          value={customer.fname}
          key={customer.fname}
          {...customer}
        >
          <AccordionTrigger>
            {customer.fname} {customer.lname}
          </AccordionTrigger>

          <AccordionContent>
            <GarmentTab measurements={[customer.pant, customer.shirt]} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function SearchBar() {
  return (
    <div className="flex w-full  items-center space-x-2">
      <Input type="text" placeholder="Customer" />
      <Button type="submit">
        <IoSearch size={24} />
      </Button>
    </div>
  );
}
