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
      const response = await fetch(`http://localhost:8080/budget`, {
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
        const response = await fetch("http://localhost:8080/budget", {
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
        <div>
          {/* Map through the budgets and render each one */}
          {budgets.map((budget, index) => (
            <div key={index}>
              <h3>{budget.budgetCategory}</h3>
              <p>Budget Amount: ${budget.amount}</p>
              {/* Additional budget details could be added here */}
              <Separator className="my-2" />
            </div>
          ))}
        </div>
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
