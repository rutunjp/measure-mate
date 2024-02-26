"use client";
import CustomersContext from "@/app/CustomerContext";
import Order from "@/components/orderList";
import { createContext, useContext, useEffect, useState } from "react";
export default function Page({ params }) {
  const CartContext = createContext();

  const customers = useContext(CustomersContext);
  const foundCustomer = customers.find(
    (customer) => customer._id === params.customer
  );

  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("FROM MAIN", cart);
  }, [cart]);
  return (
    <>
      <h1 className="text-2xl flex flex-row align-middle">
        Order for:
        <span className="text-3xl font-bold">{foundCustomer?.name}</span>
      </h1>
      <Order cart={cart} setCart={setCart} />
    </>
  );
}
