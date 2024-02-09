"use client";
import CustomersContext from "@/app/CustomerContext";
import { useContext, useState } from "react";
export default function Page({ params }) {
  const customers = useContext(CustomersContext);
  const foundCustomer = customers.find(
    (customer) => customer._id === params.customer
  );
  console.log("foundCustomer", foundCustomer);

  const [cart, setCart] = useState([]);
  return (
    <>
      <h1 className="text-2xl flex flex-row align-middle">
        Order for:
        <span className="text-3xl font-bold"> {foundCustomer?.name}</span>
      </h1>
    </>
  );
}
