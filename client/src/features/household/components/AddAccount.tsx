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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

const AddAccount = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg" className="relative">
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
            Select the account you want to add to household
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="account">Select the account</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  <span className="font-medium">Account 1</span>
                </SelectItem>
                <SelectItem value="">
                  <span className="font-medium">Account 2</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Join Household</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccount;
