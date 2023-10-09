import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { useEffect, useState } from "react";
import EmptyPlaceholder from "../layout/EmptyPlaceholder";
import { Icons } from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Metrics from "../features/budget/components/Metrics";
import CategorySpendingPieChart from "../features/budget/components/CategorySpendingChart";
import BudgetVsActualBarChart from "../features/budget/components/BudgetVsActualChart";
import BudgetProgressLineChart from "../features/budget/components/BudgetProgressChart";
import CategoryList from "../features/budget/components/CategoyList";

const Budget = () => {
  const [budgets, setBudgets] = useState([
    { budgetCategory: "Monthly Expenses", amount: 1000 },
    { budgetCategory: "Entertainment", amount: 200 }, // Add more budgets here
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState(0);
  const [budgetCategory, setBudgetCategory] = useState("");
  const { token } = useAuth();

  async function handleCreateBudget(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      budgetCategory,
      amount,
    };
    try {
      const response = await fetch(`https://expenze.vercel.app/api/budget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Budget added");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }
  useEffect(() => {
    async function fetchBudget() {
      try {
        const response = await fetch("https://expenze.vercel.app/api/budget", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching custom categories:", error);
      }
    }
    fetchBudget();
  }, []);
  return (
    <div className="h-full flex-col border-none p-8 data-[state=active]:flex">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your Budget Tracker
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your finances with ease.
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button size="sm" className="relative">
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Budget</DialogTitle>
              <DialogDescription>
                Enter the details of your new budget.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="budgetName">Budget Name</Label>
                <Input
                  id="budgetName"
                  placeholder="Monthly Expenses"
                  type="text"
                  onChange={(e) => setBudgetCategory(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budgetAmount">Budget Amount</Label>
                <Input
                  id="budgetAmount"
                  type="number"
                  placeholder="1000"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateBudget}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  " "
                )}
                Create Budget
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="my-4" />
      {budgets.length > 0 ? (
        // Render the list of budgets if there are budgets available
        // <div>
        //   {/* Map through the budgets and render each one */}
        //   {budgets.map((budget, index) => (
        //     <div key={index}>
        //       <h3>{budget.budgetCategory}</h3>
        //       <p>Budget Amount: ${budget.amount}</p>
        //       {/* Additional budget details could be added here */}
        //       <Separator className="my-2" />
        //     </div>
        //   ))}
        // </div>
        <>
          <Metrics />
          <div className="grid gap-4 grid-cols-2 pt-4 lg:grid-cols-8">
            {/* Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Spending across Categories</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CategorySpendingPieChart />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <BudgetVsActualBarChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-2 pt-4 lg:grid-cols-7">
            {/* Chart */}
            <Card className="col-span-5">
              <CardHeader>
                <CardTitle>Budget Progres</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <BudgetProgressLineChart />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CategoryList />
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // Show the empty placeholder component if no budgets are available
        <EmptyPlaceholder
          title="No Budget Created"
          description="You haven't created any budgets yet. Start by adding a new budget."
        />
      )}
    </div>
  );
};

export default Budget;
