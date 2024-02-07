"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { IoIosClose } from "react-icons/io";

import { IoAddSharp } from "react-icons/io5";
export default function NewCustomerForm() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <IoAddSharp size={24} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-row w-full justify-between ">
            <AlertDialogTitle>Add New Customer</AlertDialogTitle>{" "}
            <AlertDialogCancel>
              <IoIosClose />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            <form className="flex flex-col items-left md:items-center w-4/5 gap-2 lg:w-full">
              <div className="flex flex-row w-full gap-4 ">
                <Input type="text" id="fname" placeholder="First Name" />
                <Input type="text" id="lname" placeholder="Last Name" />
              </div>
              <Input type="phone" id="phone" placeholder="+91" /> 
              <Input type="text" id="notes" placeholder="Notes..." />
              <AlertDialogAction>Submit</AlertDialogAction>{" "}
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
