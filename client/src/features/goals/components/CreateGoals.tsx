import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

const CreateGoals = () => {
  const [showCreateHouseholdDialog, setShowCreateHouseholdDialog] =
    useState(false);
  return (
    <Dialog
      open={showCreateHouseholdDialog}
      onOpenChange={setShowCreateHouseholdDialog}
    >
      <DialogTrigger>
        <Button
          size="sm"
          className="relative"
          onSelect={() => {
            setShowCreateHouseholdDialog(true);
          }}
        >
          Create New Goal
        </Button>
      </DialogTrigger>
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

export default CreateGoals;
