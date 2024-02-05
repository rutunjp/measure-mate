/* eslint-disable @next/next/no-async-client-component */
"use client";
import CustomerList from "@/components/customerList";

export default function Page() {
  return (
    <div className="pt-24 flex  gap-4 flex-col items-center text-center">
      <CustomerList />
    </div>
  );
}
