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
import { measurements } from "@/app/config/measurements";

function createNumberSchema(fieldNames) {
  return z.object({
    ...fieldNames.reduce((acc, name) => ({ ...acc, [name]: z.number() }), {}),
  });
}

export const bottomSchema = createNumberSchema(
  Object.keys(measurements.maleBottom)
);
export const topSchema = createNumberSchema(Object.keys(measurements.maleTop));

export default function MeasurementForm({ customerid, bodyPart }) {
  const [selectedSchema, setSchema] = useState(topSchema);
  const measurements = garmentMeasurement;
  if (bodyPart == "top") {
    setSchema(topSchema);
  } else if (bodyPart == "bottom") {
    setSchema(bottomSchema);
  }

  const formInputFields = Object.keys(selectedSchema.shape);

  const form = useForm({
    resolver: zodResolver(selectedSchema),
    defaultValues: measurements
      ? {
          collar: measurements.Collar || "",
          chest: measurements.Chest || "",
          waist: measurements.Waist || "",
          biceps: measurements.Biceps || "",
          cuff: measurements.Cuff || "",
          frontWidth: measurements.FrontWidthWaist || "",
          forearm: measurements.Forearm || "",
          sleeveLength: measurements.SleeveLength || "",
        }
      : {
          collar: "",
          chest: "",
          waist: "",
          biceps: "",
          cuff: "",
          frontWidth: "",
          forearm: "",
          sleeveLength: "",
        },
  });
  useEffect(() => {
    // Reset the form values when measurements change
    form.reset(measurements);
  }, [measurements]);
  function handleSubmit(values) {
    console.log("Submitted values:", values);

    const passValues = {
      customerid,
      garmentMeasurement: values,
    };

    updateCustomer(passValues);
  }

  return (
    <ToastProvider>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
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
                              placeholder={formField}
                              type="number"
                              {...field}
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
              </Button>{" "}
              {/* <Button
              className="w-1/4"
              variant="destructive"
              size="icon"
              onClick={() => handleDelete()}
            >
              <CiTrash className="w-4" />
            </Button> */}
              <DeleteDialog customerId={customerid} />
            </div>
          </div>
        </form>
      </Form>
    </ToastProvider>
  );
}
