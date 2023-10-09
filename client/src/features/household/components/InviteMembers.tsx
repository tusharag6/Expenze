import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";

const InviteMembers = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg" variant="outline" className="relative">
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>Enter the details to invite.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="inviteId">Search for Members</Label>
            <Input
              id="inviteId"
              type="text"
              placeholder="Enter email of the member"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
