import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasurementForm from "./measurementForm";
export default function GarmentTab({ measurements, customerid }) {
  console.log("!!garments", measurements["pant"]);
  console.log("!!garments", measurements);
  return (
    <Tabs defaultValue="top" className="w-full">
      <TabsList>
        <TabsTrigger value="top">Top</TabsTrigger>
        <TabsTrigger value="bottom">Bottom</TabsTrigger>
      </TabsList>
      <TabsContent value="top">
        <MeasurementForm
          customerid={customerid}
          bodyPart={measurements["top"]}
        />
      </TabsContent>
      <TabsContent value="bottom">
        <MeasurementForm
          customerid={customerid}
          bodyPart={measurements["bottom"]}
        />
      </TabsContent>
    </Tabs>
  );
}
