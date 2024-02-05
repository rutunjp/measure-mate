import GarmentTab from "@/components/garmentTab";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AddNewCustomer from "@/components/addNewCustomer";
import { getCustomers } from "@/app/utils";
export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCustomers = await getCustomers();
        setCustomers(fetchedCustomers);
        console.log("fetchedCustomers", fetchedCustomers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p>Error fetching customers: {error.message}</p>
      ) : (
        <>
          <SearchBar setCustomers={setCustomers} />
          <Accordion collapsible className="w-full">
            {console.log("customers", customers)}
            {customers.map((customer) => (
              <AccordionItem
                value={customer.name}
                key={customer._id}
                {...customer}
              >
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
      )}
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
