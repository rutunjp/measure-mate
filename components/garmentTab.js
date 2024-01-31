import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasurementForm from "./measurementForm";
export default function GarmentTab({ measurements, customerid }) {
  console.log("!!garments", measurements["pant"]);
  console.log("!!garments", measurements);
  return (
    <Tabs defaultValue="shirt" className="w-full">
      <TabsList>
        <TabsTrigger value="shirt">Shirt</TabsTrigger>
        <TabsTrigger value="pant">Pant</TabsTrigger>
      </TabsList>
      <TabsContent value="shirt">
        <MeasurementForm
          customerid={customerid}
          garmentMeasurement={measurements["shirt"]}
          garment={"shirt"}
        />
      </TabsContent>
      <TabsContent value="pant">
        <MeasurementForm
          customerid={customerid}
          garmentMeasurement={measurements["pant"]}
          garment={"pant"}
        />
      </TabsContent>
    </Tabs>
  );
}
