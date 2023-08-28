import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: "Income" | "Expense";
  budgetCategory: string | null;
  description: string | null;
  account_id: number;
}

import { useState } from "react";
import { useSelectedAccount } from "../context/AccountContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Icons } from "./Icons";
import { useTransaction } from "../context/TransactionContext";

// Define the column configuration for the table
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Memo",
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
