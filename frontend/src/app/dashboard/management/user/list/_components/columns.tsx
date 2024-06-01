"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { getDate } from "@/util/text";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "createdAt",
    header: "Creation Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return <div>{getDate(date as Date)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Update Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return <div>{getDate(date as Date)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="text-blue-400">
              Quick Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
