import DashboardHeader from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Configure Measurement schema"
        text="Power of the sun, in the palm of your hand"
      />
      {Object.keys(measurements).map((garment, index) => (
        <GarmentCard icon={garment.icon} garmentName={garment} key={index} />
      ))}
    </DashboardShell>
  );
}
export const measurements = {
  pant: {
    waist: "Waist",
    sit: "Sit",
    knee: "Knee",
    length: "Length",
    opening: "Opening",
    thigh: "Thigh",
    hip: "Hip",
  },
  shirt: {
    length: "Length",
    shoulder: "Shoulder",
    longSleeve: "Long Sleeve",
    collar: "Collar",
    chest: "Chest",
    cuff: "Cuff",
    sit: "Sit",
    stomach: "Stomach",
  },
  suit: {
    icon: "Customer",
    measurements: {
      length: "Length",
      shoulder: "Shoulder",
      longSleeve: "Long Sleeve",
      collar: "Collar",
      chest: "Chest",
      stomach: "Stomach",
      sit: "Sit",
    },
  },
};

function GarmentCard({ icon, garmentName }) {
  const Icon = icon;

  return (
    <Card className="flex flex-col w-fit py-8 px-6 items-center ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Icon className={"h-10 w-10"} />
      </div>
      <h3 className="text-2xl font-semibold">{garmentName}</h3>
    </Card>
  );
}
