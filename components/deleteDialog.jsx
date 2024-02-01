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
import { Button } from "./ui/button";
import { CiTrash } from "react-icons/ci";
import { deleteCustomer } from "@/app/utils";
import { toast } from "sonner";

export default function DeleteDialog({ customerId }) {
  async function handleDelete() {
    try {
      if (await deleteCustomer(customerId)) {
        toast.error("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        console.log("deleted");
      }
    } catch (error) {
      console.log("Error deleting customer:", customerId, error);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" size="icon">
            <CiTrash className="w-4" />
          </Button>
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
              onClick={() => {
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
