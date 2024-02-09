"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import CustomersContext from "./CustomerContext";
import { useState, useEffect, createContext } from "react";

import { getCustomers } from "./utils";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
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
    <CustomersContext.Provider value={customers}>
      <html lang="en">
        <head>
          <title>Title</title>
          <meta name="description" content="Description" />
        </head>

        <body className={inter.className}>
          <div className="w-10/12 md:w-3/4 lg:w-3/4 flex flex-col m-auto items-center rounded-md overflow-hidden ">
            <Toaster richColors />
            {children}
          </div>
        </body>
      </html>
    </CustomersContext.Provider>
  );
}
