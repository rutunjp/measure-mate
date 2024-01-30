"use client";
import { Button } from "./ui/button";
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

const pantSchema = z.object({
  chest: z.coerce.number(),
  cuff: z.coerce.number(),
  frontWidth: z.coerce.number(),
  forearm: z.coerce.number(),
  sleeveLength: z.coerce.number(),
});
const shirtSchema = z.object({
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

export default function MeasurementForm(props) {
  const measurements = props.garmentMeasurement;
  console.log("measurements", measurements);
  const foundGarment = garments[props.garment];
  const selectedSchema = foundGarment.schema;

  const form = useForm({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      collar: measurements.Collar,
      chest: measurements.Chest,
      waist: measurements.Waist,
      biceps: measurements.Biceps,
      cuff: measurements.Cuff,
      frontWidth: measurements.FrontWidthWaist,
      forearm: measurements.Forearm,
      sleeveLength: measurements.SleeveLength,
    },
  });
  function handleSubmit(values) {
    console.log("values", values);
  }
  const formFieldsArray = {
    pant: [
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
    shirt: [
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
  };
  const formFields = formFieldsArray[props.garment];

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-2 ">
          <div className="grid grid-cols-2 gap-2  ">
            {formFields.map((formField) => {
              return (
                <FormField
                  control={form.control || {}}
                  key={formField.id}
                  name={formField.id}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{formField.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={formField.placeholder}
                            type={formField.type}
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
