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
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";

const JoinHousehold = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg" variant="outline" className="relative">
          Join Household
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Household</DialogTitle>
          <DialogDescription>
            Enter the details to join household.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="inviteId">Enter invite id</Label>
            <Input id="inviteId" type="text" placeholder="" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Household</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinHousehold;
