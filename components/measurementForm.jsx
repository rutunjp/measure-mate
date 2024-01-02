'use client'
import Navbar from './garmentTab'
import { Button } from './ui/button'
import { DevTool } from '@hookform/devtools'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormDescription,
} from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const pantSchema = z.object({
  chest: z.coerce.number(),
  cuff: z.coerce.number(),
  frontWidth: z.coerce.number(),
  forearm: z.coerce.number(),
  sleeveLength: z.coerce.number(),
})
const shirtSchema = z.object({
  collar: z.coerce.number(),
  chest: z.coerce.number(),
  cuff: z.coerce.number(),
  frontWidth: z.coerce.number(),
  forearm: z.coerce.number(),
  sleeveLength: z.coerce.number(),
})
const garments = {
  pant: {
    schema: pantSchema,
    fields: [
      {
        label: 'Collar',
        placeholder: 'Collar',
        id: 'collar',
        type: 'number',
      },
      {
        label: 'Chest',
        placeholder: 'Chest',
        id: 'chest',
        type: 'number',
      },
      {
        label: 'Waist',
        placeholder: 'Waist',
        id: 'waist',
        type: 'number',
      },
      {
        label: 'Front Width',
        placeholder: 'Front Width',
        id: 'frontWidth',
        type: 'number',
      },
      {
        label: 'Sleeve Length',
        placeholder: 'Sleeve Length',
        id: 'sleeveLength',
        type: 'number',
      },
      {
        label: 'Forearm',
        placeholder: 'Forearm',
        id: 'forearm',
        type: 'number',
      },
      {
        label: 'Biceps',
        placeholder: 'Biceps',
        id: 'biceps',
        type: 'number',
      },
      {
        label: 'Cuff',
        placeholder: 'Cuff',
        id: 'cuff',
        type: 'number',
      },
    ],
  },
  shirt: {
    schema: shirtSchema,
    fields: [
      {
        label: 'Collar',
        placeholder: 'Collar',
        id: 'collar',
        type: 'number',
      },
      {
        label: 'Chest',
        placeholder: 'Chest',
        id: 'chest',
        type: 'number',
      },
      {
        label: 'Waist',
        placeholder: 'Waist',
        id: 'waist',
        type: 'number',
      },
      {
        label: 'Front Width',
        placeholder: 'Front Width',
        id: 'frontWidth',
        type: 'number',
      },
      {
        label: 'Sleeve Length',
        placeholder: 'Sleeve Length',
        id: 'sleeveLength',
        type: 'number',
      },
      {
        label: 'Forearm',
        placeholder: 'Forearm',
        id: 'forearm',
        type: 'number',
      },
      {
        label: 'Biceps',
        placeholder: 'Biceps',
        id: 'biceps',
        type: 'number',
      },
      {
        label: 'Cuff',
        placeholder: 'Cuff',
        id: 'cuff',
        type: 'number',
      },
    ],
  },
}

export default function MeasurementForm({ garment }) {
  // const foundGarment = garments.find((garm) =>
  //   Object.keys(garm).some((key) => key == garment)
  // )
  const foundGarment = garments[garment]
  const selectedSchema = foundGarment.schema

  const form = useForm({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      collar: '',
      chest: '',
      waist: '',
      biceps: '',
      cuff: '',
      frontWidth: '',
      forearm: '',
      sleeveLength: '',
    },
  })
  function handleSubmit(values) {
    console.log('values', values)
  }
  const formFieldsArray = {
    pant: [
      {
        label: 'Chest',
        placeholder: 'Chest',
        id: 'chest',
        type: 'number',
      },
      {
        label: 'Waist',
        placeholder: 'Waist',
        id: 'waist',
        type: 'number',
      },
      {
        label: 'Front Width',
        placeholder: 'Front Width',
        id: 'frontWidth',
        type: 'number',
      },
      {
        label: 'Sleeve Length',
        placeholder: 'Sleeve Length',
        id: 'sleeveLength',
        type: 'number',
      },
      {
        label: 'Forearm',
        placeholder: 'Forearm',
        id: 'forearm',
        type: 'number',
      },
      {
        label: 'Biceps',
        placeholder: 'Biceps',
        id: 'biceps',
        type: 'number',
      },
      {
        label: 'Cuff',
        placeholder: 'Cuff',
        id: 'cuff',
        type: 'number',
      },
    ],
    shirt: [
      {
        label: 'Collar',
        placeholder: 'Collar',
        id: 'collar',
        type: 'number',
      },
      {
        label: 'Chest',
        placeholder: 'Chest',
        id: 'chest',
        type: 'number',
      },
      {
        label: 'Waist',
        placeholder: 'Waist',
        id: 'waist',
        type: 'number',
      },
      {
        label: 'Front Width',
        placeholder: 'Front Width',
        id: 'frontWidth',
        type: 'number',
      },
      {
        label: 'Sleeve Length',
        placeholder: 'Sleeve Length',
        id: 'sleeveLength',
        type: 'number',
      },
      {
        label: 'Forearm',
        placeholder: 'Forearm',
        id: 'forearm',
        type: 'number',
      },
      {
        label: 'Biceps',
        placeholder: 'Biceps',
        id: 'biceps',
        type: 'number',
      },
      {
        label: 'Cuff',
        placeholder: 'Cuff',
        id: 'cuff',
        type: 'number',
      },
    ],
  }
  const formFields = formFieldsArray[garment]

  return (
    <Form {...form}>
      {' '}
      <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-2 ">
          {' '}
          <div className="grid grid-cols-2 gap-2  ">
            {' '}
            {formFields.map((formField) => {
              // console.log('formField', formField.id)
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
                    )
                  }}
                />
              )
            })}{' '}
          </div>{' '}
          <Button type="submit">Submit</Button>{' '}
        </div>{' '}
      </form>{' '}
    </Form>
  )
}
