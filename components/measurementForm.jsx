"use client";
import { deleteCustomer, getCustomers, updateCustomer } from "@/app/utils";
import { Button } from "./ui/button";

import { CiTrash } from "react-icons/ci";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useContext, useEffect, useState } from "react";
import DeleteDialog from "./deleteDialog";
import { ToastProvider } from "./ui/toast";
import { measurements } from "@/config/measurements";
import { toast } from "sonner";
import Link from "next/link";

function createNumberSchema(fieldNames) {
  return z.object({
    ...fieldNames.reduce(
      (acc, name) => ({
        ...acc,
        [name]: z.coerce.number(),
      }),
      {}
    ),
  });
}

export const bottomSchema = createNumberSchema(
  Object.keys(measurements.maleBottom)
);
export const topSchema = createNumberSchema(Object.keys(measurements.maleTop));

export default function MeasurementForm({
  customerid,
  bodyPart,
  customerMeasurements,
}) {
  const [selectedSchema, setSchema] = useState(topSchema);
  useEffect(() => {
    if (bodyPart === "top") {
      setSchema(topSchema);
    } else if (bodyPart === "bottom") {
      setSchema(bottomSchema);
    }
  }, [bodyPart]);

  const formInputFields = Object.keys(selectedSchema.shape);

  const form = useForm({
    resolver: zodResolver(selectedSchema),
    defaultValues: customerMeasurements
      ? customerMeasurements
      : formInputFields.reduce((acc, fieldName) => {
          return { ...acc, [fieldName]: "yet to enter" };
        }, {}),
  });
  function handleSubmit(values) {
    const updateSuccess = updateCustomer({ customerid, values, bodyPart });
    if (updateSuccess) {
      toast.info("Updated Values");
    }
    console.log("change ", customerid, values, bodyPart);
  }

  return (
    <ToastProvider>
      <Form {...form}>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit);
          }}
        >
          <div className="flex flex-col gap-2 ">
            <div className="grid grid-cols-2 gap-2  ">
              {formInputFields.map((formField) => {
                return (
                  <FormField
                    control={form.control || {}}
                    key={formField}
                    name={formField}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>{formField.toUpperCase()}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              placeholder="yet to enter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            </div>
            <div className="w-full inline-flex gap-2 m-auto">
              <Button className="w-3/4" type="submit">
                Submit
              </Button>
              <DeleteDialog customerId={customerid} />

              <Button variant="outline">
                <Link variant="button" href={`/newOrder/${customerid}`} >
                  New Order
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ToastProvider>
  );
}
