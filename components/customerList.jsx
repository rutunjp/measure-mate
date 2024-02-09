"use client";
import GarmentTab from "@/components/garmentTab";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AddNewCustomer from "@/components/addNewCustomer";
import CustomersContext from "@/app/CustomerContext";

export default function CustomerList() {
  const customers = useContext(CustomersContext);
  return (
    <>
      <SearchBar />
      <Accordion collapsible className="w-full">
        {console.log("customers", customers)}
        {customers?.map((customer) => (
          <AccordionItem value={customer.name} key={customer._id} {...customer}>
            <AccordionTrigger>{customer.name} </AccordionTrigger>
            <AccordionContent>
              <GarmentTab
                measurements={{
                  top: customer?.top,
                  bottom: customer?.bottom,
                }}
                customerid={customer._id}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export function SearchBar({ setCustomers }) {
  return (
    <div className="flex w-full  items-center space-x-2">
      <Input type="text" placeholder="Customer" />
      <Button type="submit">
        <IoSearch size={24} />
      </Button>
      <AddNewCustomer setCustomers={setCustomers} />
    </div>
  );
}
