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
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date and Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "budgetCategory",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
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
  {
    id: "actions",
    cell: ({ row }) => {
      const [showAddTransactionDialog, setShowAddTransactionDialog] =
        useState(false);
      const [, setOpen] = useState(false);
      const [isLoading, setIsLoading] = useState<boolean>(false);

      // Initialize state variables for form inputs
      const [amount, setAmount] = useState("");
      const [type, setType] = useState("");
      const [budgetCategory, setBudgetCategory] = useState("");
      const [description, setDescription] = useState("");
      const { updateTransactionData } = useTransaction();

      const { selectedAccountData } = useSelectedAccount();
      const transaction = row.original;

      async function handleEditTransaction(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const data = {
          amount: parseFloat(amount),
          type,
          budgetCategory,
          description,
        };

        // console.log(data);
        let accountId = selectedAccountData?.id;
        let transactionId = transaction?.id;
        // console.log(accountId, transactionId);

        try {
          // Make an API request to add the new transaction
          const response = await fetch(
            `https://expenze-api.onrender.com/api/transactions/${transactionId}/accounts/${accountId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                // Add any other necessary headers, like authorization
              },
              body: JSON.stringify(data),
            }
          );

          if (response.ok) {
            alert("Transaction Edited");
            // Transaction added successfully
            // Handle success behavior here

            try {
              const response = await fetch(
                `https://expenze-api.onrender.com/api/transaction/accounts/${accountId}`
              );
              const data = await response.json();
              updateTransactionData(data);
              // console.log("columns", transactionData);
            } catch (error) {
              console.log(error);
            }
          } else {
            const error = await response.json();
            console.log(error);

            alert("Error");
            // Handle error behavior here
          }
        } catch (error) {
          console.error(error);
        }

        setIsLoading(false);
      }

      return (
        <Dialog
          open={showAddTransactionDialog}
          onOpenChange={setShowAddTransactionDialog}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(String(transaction.id))
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DialogTrigger>
                <DropdownMenuItem
                  onSelect={() => {
                    setOpen(false);
                  }}
                >
                  Edit transaction details
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>View transaction details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Add a new transaction with the following details.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Transaction Type</Label>
                  <Select onValueChange={(e) => setType(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Income">
                        <span className="font-medium">Income</span>
                        {/* <span className="text-muted-foreground">
                        Trial for two weeks
                      </span> */}
                      </SelectItem>
                      <SelectItem value="Expense">
                        <span className="font-medium">Expense</span>
                        {/* <span className="text-muted-foreground">
                        $9/month per user
                      </span> */}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Budget Category</Label>
                  <Input
                    id="category"
                    type="text"
                    placeholder="Enter category"
                    value={budgetCategory}
                    onChange={(e) => setBudgetCategory(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Memo / Description</Label>
                  <Input
                    id="memo"
                    type="text"
                    placeholder="Enter memo or description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddTransactionDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleEditTransaction}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  " "
                )}
                Edit Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
