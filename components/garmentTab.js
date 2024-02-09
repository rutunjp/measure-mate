import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasurementForm from "./measurementForm";
import { useContext } from "react";
import { CustomersContext } from "./customerList";
export default function GarmentTab({ customerid, measurements }) {
 
  return (
    <Tabs defaultValue="top" className="w-full">
      <TabsList>
        <TabsTrigger value="top">Top</TabsTrigger>
        <TabsTrigger value="bottom">Bottom</TabsTrigger>
      </TabsList>
      <TabsContent value="top">
        <MeasurementForm
          customerid={customerid}
          bodyPart="top"
          customerMeasurements={measurements.top}
        />
      </TabsContent>
      <TabsContent value="bottom">
        <MeasurementForm
          customerid={customerid}
          bodyPart="bottom"
          customerMeasurements={measurements.bottom}
        />
      </TabsContent>
    </Tabs>
  );
}
