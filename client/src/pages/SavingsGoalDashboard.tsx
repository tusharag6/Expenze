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
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import EmptyPlaceholderGoals from "../features/goals/components/EmptyPlaceholderGoals";
import SummaryCards from "../features/goals/components/SummaryCards";
import PersonalGoals from "../features/goals/components/PersonalGoals";
import MarketplaceGoals from "../features/goals/components/MarketplaceGoals";

const SavingsGoalDashboard = () => {
  const goalCreated = true;
  return (
    <Dialog>
      <div className="flex-1 space-y-4 pt-6 md:px-7">
        {!goalCreated ? (
          <EmptyPlaceholderGoals
            title="No Savings Goals Created"
            description="Start by creating a new savings goal to track your financial objectives."
          />
        ) : (
          <div className="h-full flex-col border-none data-[state=active]:flex">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Your Savings Goals Dashboard
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Plan, Track, and Achieve Your Financial Objectives.
                  </p>
                </div>
              </div>

              <div className=" space-x-4">
                <DialogTrigger asChild>
                  <Button>Create New Goal</Button>
                </DialogTrigger>
              </div>
            </div>
            <Separator className="my-4" />

            <SummaryCards />

            {/* Personal Goals */}
            <div className="flex items-center justify-between my-4 pt-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Your Personal Savings Goals
                </h2>
                <p className="text-sm text-muted-foreground">
                  Set and track your financial objectives. Stay on target.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <PersonalGoals />

            {/* Marketplace Goals */}
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Recommended Savings Goals
              </h2>
              <p className="text-sm text-muted-foreground">
                Explore predefined goals and choose the ones that suit your
                financial plans.
              </p>
            </div>

            <Separator className="my-4" />
            <MarketplaceGoals />
          </div>
        )}
      </div>

      {/* create goal form */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Savings Goal</DialogTitle>
          <DialogDescription>
            Please provide the details for your new savings goal.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                type="text"
                placeholder="Enter goal name"
                value=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalDescription">
                Goal Description (Optional)
              </Label>
              <Input
                id="goalDescription"
                type="text"
                placeholder="Enter goal description"
                value=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="Enter target amount"
                value=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                placeholder="Select target date"
                value=""
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Create Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsGoalDashboard;
