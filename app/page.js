"use client";
import SignInForm from "@/components/ui/signInForm";

import { useState, useEffect } from "react";
export default function Home() {
  return (
    <div className="flex flex-col  mt-20 gap-6 w-full   m-auto lg:mt-20  ">
      <div className="flex flex-col w-full">
        <h2 className="text-xl opacity-70 md:text-2xl lg:text-3xl">
          Welcome to
        </h2>
        <h1 className="font-bold text-5xl md:text-5xl lg:text-6xl ">
          Measure Mate🧵
        </h1>
      </div>
      <SignInForm />
    </div>
  );
}
