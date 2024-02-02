import { cn } from "@/lib/utils";
export function DashboardShell({ children, className, ...props }) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
}
