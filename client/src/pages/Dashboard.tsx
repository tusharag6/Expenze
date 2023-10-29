import { useState, useEffect } from "react";

// Import UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

// import { MainNav } from "./components/MainNav";
import { Overview } from "../features/analytics/components/Overview";
// import { Ov2 } from "../components/Ov2";
import RecentTransaction from "../features/analytics/components/RecentTransaction";
import { Icons } from "../components/Icons";
import React from "react";
import { useSelectedAccount } from "../context/AccountContext";
import SummaryCards from "../features/analytics/components/SummaryCards";
import EmptyPlaceholder from "../layout/EmptyPlaceholder";
import { useAuth } from "../context/AuthContext";
import { Separator } from "../../components/ui/separator";

export default function Dashboard() {
  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    useState(false);
  const [, setOpen] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { token } = useAuth();

  // Initialize state variables for form inputs
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [budgetCategory, setBudgetCategory] = useState("");
  const [description, setDescription] = useState("");

  const { selectedAccountData } = useSelectedAccount();

  async function handleNewTransaction(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      amount: parseFloat(amount),
      type,
      budgetCategory,
      description,
    };

    console.log(data);
    let accountId = selectedAccountData?.id;

    try {
      // Make an API request to add the new transaction
      const response = await fetch(
        `https://expenze-api.onrender.com/api/transactions/accounts/${accountId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Transaction added");
        // Transaction added successfully
        // Handle success behavior here
      } else {
        alert("Error");
        // Handle error behavior here
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  async function fetchCustomCategories() {
    try {
      const response = await fetch(
        "https://expenze-api.onrender.com/api/budget",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const categoryNames = data.map(
        (category: { category: any }) => category.category
      );

      return categoryNames;

      return data;
    } catch (error) {
      console.error("Error fetching custom categories:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const fetchedCustomCategoriesData = await fetchCustomCategories();
      setCustomCategories(fetchedCustomCategoriesData);
    }
    fetchData();
  }, []);

  return (
    <Dialog
      open={showAddTransactionDialog}
      onOpenChange={setShowAddTransactionDialog}
    >
      <div className="flex-1 space-y-4 pt-6 md:px-7">
        {!selectedAccountData ? (
          <EmptyPlaceholder
            title="No Account Added"
            description="Please add an account to view its details."
          />
        ) : (
          <div className="h-full flex-col border-none data-[state=active]:flex">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Your Budget Tracker
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your finances with ease.
                </p>
              </div>
              <div className=" space-x-4">
                <DialogTrigger asChild>
                  <Button
                    onSelect={() => {
                      setOpen(false);
                    }}
                  >
                    Add Transaction
                  </Button>
                </DialogTrigger>
              </div>
            </div>
            <Separator className="my-4" />

            <SummaryCards />
            <div className="grid gap-4 grid-cols-2 pt-4 lg:grid-cols-7">
              {/* Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>

              {/* Recent Transaction */}
              <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    {/* You made 265 sales this month. */}
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <RecentTransaction />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Add transaction form */}
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
              <Label htmlFor="type">Budget Category</Label>
              {customCategories && Array.isArray(customCategories) && (
                <Select onValueChange={(e) => setBudgetCategory(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {customCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <span className=" font-medium">{category}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
            onClick={handleNewTransaction}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              " "
            )}
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
