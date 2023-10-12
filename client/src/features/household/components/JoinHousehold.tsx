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
import { useState } from "react";
import { Icons } from "../../../components/Icons";
import { householdService } from "..";

const JoinHousehold = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [joiningId, setJoiningId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await householdService.joinHousehold(joiningId);
      alert("Household Joined successfully");
    } catch (error) {
      console.error(error);
      alert("Error joining Household");
    }

    setIsLoading(false);
  }
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
            <Input
              id="inviteId"
              type="text"
              placeholder=""
              onChange={(e) => setJoiningId(e.target.value)}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <Button type="submit">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                " "
              )}
              Join Household
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinHousehold;
