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

const CreateHousehold = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [membersEmails, setMembersEmails] = useState<String[]>([]);

  const handleMembersEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailString = e.target.value;
    const emailAddresses = emailString.split(",");
    const filteredEmailAddresses = emailAddresses.filter(
      (emailAddress) => emailAddress !== ""
    );
    setMembersEmails(filteredEmailAddresses);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="relative">
          Create Household
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Household</DialogTitle>
          <DialogDescription>
            Enter the details of your new household.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="householdMembers">Household Member's Email</Label>
            <Input
              id="householdMembers"
              type="text"
              placeholder="johndoe@john.com, janesmith@jane.com"
              onChange={handleMembersEmailChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Household</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHousehold;
