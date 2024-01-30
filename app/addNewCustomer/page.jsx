"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useMediaQuery } from "@react-hook/media-query";
const newUserSchema = z.object({
  name: z.string().min(2).max(50),
});
export default function Page() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const newCustomerForm = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: { name: "" },
  });
  function handleSubmit(values) {
    console.log("values", values);
  }
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <Form {...newCustomerForm}>
              <form onSubmit={newCustomerForm.handleSubmit(handleSubmit)}>
                <FormField
                  control={newCustomerForm.control || {}}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Name"
                            type="text"
                            {...field}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />{" "}
                <Button type="submit">Submit</Button>
              </form>{" "}
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <PlusIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>New Customer</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when done.
            </DrawerDescription>{" "}
            <Form {...newCustomerForm}>
              <form onSubmit={newCustomerForm.handleSubmit(handleSubmit)}>
                <FormField
                  control={newCustomerForm.control || {}}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Name"
                            type="text"
                            {...field}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />{" "}
                <Button type="submit">Submit</Button>
              </form>{" "}
            </Form>
          </DrawerHeader>

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
