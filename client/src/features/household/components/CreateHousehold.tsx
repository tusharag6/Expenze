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
import { Icons } from "../../../components/Icons";
import { householdService } from "..";
import { useAuth } from "../../../context/AuthContext";
import { useHousehold } from "../../../context/HouseholdContext";

const CreateHousehold = () => {
  const [showCreateHouseholdDialog, setShowCreateHouseholdDialog] =
    useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const { householdData, setHouseholdData } = useHousehold();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data: any = await householdService.createHousehold(token);
      if (data !== null) {
        setHouseholdData(data);
        localStorage.setItem("householdData", data);
        console.log("house", householdData);
        localStorage.setItem("Role", "Owner");
        localStorage.setItem("isEmpty", "false");
        alert("Household Created successfully");
      } else {
        alert("Error creating Household");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating Household");
    }

    setIsLoading(false);
  }
  // console.log("house 2", householdData);

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
            <Button type="submit">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                " "
              )}
              Create Household
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHousehold;
