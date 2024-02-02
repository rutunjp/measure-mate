import DashboardHeader from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CustomerList, SearchBar } from "../customers/page";
export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Customers"
        text="Power of the sun, in the palm of your hand"
      />
      <div> 
        <CustomerList />
      </div>
    </DashboardShell>
  );
}
