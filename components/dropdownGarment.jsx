"use client";
import { garments } from "@/config/garments";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownGarment() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Add new item</Button>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>New Garment</DropdownMenuLabel>
          {garments.map((garment, i) => (
            <DropdownMenuItem key={i}>{garment}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
