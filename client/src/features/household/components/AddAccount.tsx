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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useEffect, useState } from "react";
import { accountService } from "../../account";
import { useAuth } from "../../../context/AuthContext";
import { Account } from "../../../types/account";
import { householdService } from "..";
import { Icons } from "../../../components/Icons";

const AddAccount = () => {
  const { token } = useAuth();
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await accountService.fetchAccounts(token);
        setAccountData(accounts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const householdIdString = localStorage.getItem("householdId");
    const householdId =
      householdIdString !== null ? parseInt(householdIdString) : 0;

    try {
      await householdService.addAccount(
        token,
        householdId,
        parseInt(accountId)
      );
      alert("Account Added successfully");
    } catch (error) {
      console.error(error);
      alert("No valid household data available. Cannot add account.");
    }
    setIsLoading(false);
  }
  console.log(accountId);

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
                {accountData.map((account) => (
                  <SelectItem
                    key={account.id}
                    value={account.id.toString()}
                    onClick={(e) => {
                      const newValue = e.currentTarget.getAttribute("value");
                      console.log(newValue, "onclick");

                      if (newValue !== null) {
                        setAccountId(newValue);
                      }
                    }}
                  >
                    <span className="font-medium">{account.account_name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <Button type="submit">
              {" "}
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                " "
              )}
              Add Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccount;
