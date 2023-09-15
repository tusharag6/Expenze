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

const CreateHousehold = () => {
  const [showCreateHouseholdDialog, setShowCreateHouseholdDialog] =
    useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
          Create Household
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="py-4">
          <DialogTitle>Are you sure you want to create a Household</DialogTitle>
          <DialogDescription className="pt-2">
            Upon clicking "Create Household", a household will be created, where
            you can manage your family's finance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateHouseholdDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Household</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHousehold;
