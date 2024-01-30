import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasurementForm from "./measurementForm";
export default function GarmentTab() {
  return (
    <Tabs defaultValue="shirt" className="w-full">
      <TabsList>
        <TabsTrigger value="shirt">Shirt</TabsTrigger>
        <TabsTrigger value="pant">Pant</TabsTrigger>
      </TabsList>
      <TabsContent value="shirt">
        <MeasurementForm garment={"shirt"} />
      </TabsContent>
      <TabsContent value="pant">
        <MeasurementForm garment={"pant"} />
      </TabsContent>
    </Tabs>
  );
}
