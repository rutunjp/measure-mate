"use client";
import DashboardHeader from "@/components/header";
import { DashboardShell } from "@/components/shell";
import CustomerList from "@/components/customerList";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Customers"
        text="Power of the sun, in the palm of your hand"
      />
      <CustomerList />
    </DashboardShell>
  );
}
