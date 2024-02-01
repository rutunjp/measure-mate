"use client";
import { deleteCustomer, updateCustomer } from "@/app/utils";
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
import { useContext, useEffect } from "react";
import DeleteDialog from "./deleteDialog";
import { ToastProvider } from "./ui/toast";

export const pantSchema = z.object({
  chest: z.coerce.number(),
  cuff: z.coerce.number(),
  waist: z.coerce.number(),
  frontWidth: z.coerce.number(),
  forearm: z.coerce.number(),
  sleeveLength: z.coerce.number(),
});
export const shirtSchema = z.object({
  collar: z.coerce.number(),
  chest: z.coerce.number(),
  cuff: z.coerce.number(),
  frontWidth: z.coerce.number(),
  forearm: z.coerce.number(),
  sleeveLength: z.coerce.number(),
});

const garments = {
  pant: {
    schema: pantSchema,
    fields: [
      {
        label: "Collar",
        placeholder: "Collar",
        id: "collar",
        type: "number",
      },
      {
        label: "Chest",
        placeholder: "Chest",
        id: "chest",
        type: "number",
      },
      {
        label: "Waist",
        placeholder: "Waist",
        id: "waist",
        type: "number",
      },
      {
        label: "Front Width",
        placeholder: "Front Width",
        id: "frontWidth",
        type: "number",
      },
      {
        label: "Sleeve Length",
        placeholder: "Sleeve Length",
        id: "sleeveLength",
        type: "number",
      },
      {
        label: "Forearm",
        placeholder: "Forearm",
        id: "forearm",
        type: "number",
      },
      {
        label: "Biceps",
        placeholder: "Biceps",
        id: "biceps",
        type: "number",
      },
      {
        label: "Cuff",
        placeholder: "Cuff",
        id: "cuff",
        type: "number",
      },
    ],
  },
  shirt: {
    schema: shirtSchema,
    fields: [
      {
        label: "Collar",
        placeholder: "Collar",
        id: "collar",
        type: "number",
      },
      {
        label: "Chest",
        placeholder: "Chest",
        id: "chest",
        type: "number",
      },
      {
        label: "Waist",
        placeholder: "Waist",
        id: "waist",
        type: "number",
      },
      {
        label: "Front Width",
        placeholder: "Front Width",
        id: "frontWidth",
        type: "number",
      },
      {
        label: "Sleeve Length",
        placeholder: "Sleeve Length",
        id: "sleeveLength",
        type: "number",
      },
      {
        label: "Forearm",
        placeholder: "Forearm",
        id: "forearm",
        type: "number",
      },
      {
        label: "Biceps",
        placeholder: "Biceps",
        id: "biceps",
        type: "number",
      },
      {
        label: "Cuff",
        placeholder: "Cuff",
        id: "cuff",
        type: "number",
      },
    ],
  },
};

export default function MeasurementForm({
  garmentMeasurement,
  garment,
  customerid,
}) {
  const measurements = garmentMeasurement;
  const foundGarment = garments[garment];
  const selectedSchema = foundGarment.schema;
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
      garment: [garment],
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
