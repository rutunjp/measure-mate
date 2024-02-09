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

import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { CiTrash } from "react-icons/ci";
import { deleteCustomer, getCustomers } from "@/app/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Router } from "next/router";

export default function DeleteDialog({ customerId }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      if (await deleteCustomer(customerId)) {
        setIsDeleteLoading(false);
        toast.error("Customer deleted", {
          // description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        location.reload();
      }
      setShowDeleteAlert(!showDeleteAlert);
    } catch (error) {
      console.log("Error deleting customer:", customerId, error);
    }
  }

  return (
    <>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogTrigger>
          {isDeleteLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Button variant="destructive" size="icon">
              <CiTrash className="w-4" />
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the user permanently
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteLoading(true);

                handleDelete();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
