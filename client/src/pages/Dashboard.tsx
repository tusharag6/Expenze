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
import Balance from "../features/analytics/components/Balance";
import { Progress } from "../../components/ui/progress";
import Bills from "../features/analytics/components/Bills";
import AddNewBill from "../features/bills/components/AddNewBill";
import Savings from "../features/analytics/components/Savings";
import AddNewSavings from "../features/analytics/components/AddNewSavings";
import { ChevronRight } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { profileService } from "../features/profile";
import { dashboardService } from "../features/analytics";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

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

  const addTransactionMutation = useMutation({
    mutationFn: async (data: any) => {
      dashboardService.addTransaction(selectedAccountData?.id, token, data);
    },
    onSuccess: () => {
      Toast.fire({
        icon: "success",
        title: "Transaction added successfully",
      });
    },
    onError: () => {
      Toast.fire({
        icon: "error",
        title: "Uh oh! Something went wrong.",
        text: "There was a problem with creating your transaction.",
      });
    },
  });

  async function handleNewTransaction(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      amount: parseFloat(amount),
      type,
      budgetCategory,
      description,
    };
    await addTransactionMutation.mutateAsync(data);
    setIsLoading(false);
  }

  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const { data: customCategories } = useQuery({
    queryKey: ["customCategories"],
    queryFn: async () => {
      const customCategories = await dashboardService.fetchBudgetCategories(
        token
      );
      return customCategories;
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await profileService.fetchUserData(token);
      return user;
    },
  });

  const userName = userData?.username || "User";

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
          <div className="h-full flex-col border-none data-[state=active]:flex ">
            <div className="flex items-center justify-between ">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Hello, {userName}!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Let's conquer your financial goals today.
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
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col gap-4 col-span-4">
                <SummaryCards />

                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Spending Trends</CardTitle>
                    {/* <DatePickerCard /> */}
                    <div className="space-y-2">
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select time frame" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 pr-6 pb-4">
                    <Overview />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <Card className="mb-4">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Upcoming Bills</CardTitle>
                        <Link to="/personal/bills">
                          <ChevronRight className="cursor-pointer" />
                        </Link>
                      </CardHeader>
                      <CardContent className="flex items-center py-0 gap-2">
                        <AddNewBill />
                        <Bills />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Upcoming Bills</CardTitle>
                        <Link to="/personal/bills">
                          <ChevronRight className="cursor-pointer" />
                        </Link>
                      </CardHeader>
                      <CardContent className="flex items-center py-0 gap-2">
                        <AddNewBill />
                        <Bills />
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="">
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

              <div className="flex flex-col gap-4">
                <Card className="">
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                    <CardDescription>Total Income of 10%</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center">
                      <div className="absolute mb-6 ml-2 text-center">
                        <span className="font-light text-md">Total</span>
                        <br />
                        <span className="font-bold text-xl">$21,329</span>
                      </div>
                      <Balance />
                    </div>
                    <div className="grid grid-cols-2 gap-14 text-center">
                      <div>
                        <p className="pb-2 text-sm text-muted-foreground">
                          Income
                        </p>
                        <Progress value={progress} />
                        <p className="pt-2 font-semibold">60%</p>
                      </div>
                      <div>
                        <p className="pb-2 text-sm text-muted-foreground">
                          Expense
                        </p>
                        <Progress value={40} />
                        <p className="pt-2 font-semibold">40%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="">
                  <CardHeader className="border border-border rounded-ss-md py-5 flex flex-row items-center justify-between">
                    <CardTitle>My Savings</CardTitle>
                    <ChevronRight className="cursor-pointer" />
                  </CardHeader>
                  <div className="flex flex-row items-end justify-between px-6 py-4 pb-6">
                    <p className="text-muted-foreground text-md">
                      Total Savings
                    </p>
                    <p className="font-semibold text-xl">
                      $12,500{" "}
                      <span className="text-muted-foreground text-sm">.00</span>{" "}
                    </p>
                  </div>
                  <CardContent className="flex flex-col items-center py-0 gap-4">
                    <AddNewSavings />
                    <Savings />
                  </CardContent>
                </Card>
              </div>
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
