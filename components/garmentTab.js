import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasurementForm from "./measurementForm";
export default function GarmentTab(garments) { 
  return (
    <Tabs defaultValue="shirt" className="w-full">
      <TabsList>
        <TabsTrigger value="shirt">Shirt</TabsTrigger>
        <TabsTrigger value="pant">Pant</TabsTrigger>
      </TabsList>
      <TabsContent value="shirt">
        <MeasurementForm
          garmentMeasurement={garments.measurements[0]}
          garment={"shirt"}
        />
      </TabsContent>
      <TabsContent value="pant">
        <MeasurementForm
          garmentMeasurement={garments.measurements[1]}
          garment={"pant"}
        />
      </TabsContent>
    </Tabs>
  );
}
