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
import { BudegtEmptyPlaceholder } from "../components/BudgetEmptyPlaceholder";
import { useState } from "react";

const Budget = () => {
  const [budgets, setBudgets] = useState([
    { name: "Monthly Expenses", amount: 1000 },
    { name: "Entertainment", amount: 200 }, // Add more budgets here
  ]);
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
                <Input id="budgetName" placeholder="Monthly Expenses" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budgetAmount">Budget Amount</Label>
                <Input id="budgetAmount" type="number" placeholder="1000" />
              </div>
            </div>
            <DialogFooter>
              <Button>Create Budget</Button>
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
              <h3>{budget.name}</h3>
              <p>Budget Amount: ${budget.amount}</p>
              {/* Additional budget details could be added here */}
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      ) : (
        // Show the empty placeholder component if no budgets are available
        <BudegtEmptyPlaceholder />
      )}
    </div>
  );
};

export default Budget;
