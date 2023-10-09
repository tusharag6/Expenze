import { useEffect, useState } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedAccount } from "../../../context/AccountContext";
import { Icons } from "../../../components/Icons";
import { accountService } from "..";
import { FaMoneyCheck } from "react-icons/fa";

interface Account {
  account_name: String;
  account_number: String;
  id: number;
  initial_balance: number;
  user_id: number;
}

export default function AccountSwitcher() {
  const [open, setOpen] = useState(false);
  const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Number>();
  const { selectedAccountData, setSelectedAccountData } = useSelectedAccount();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await accountService.fetchAccounts(token);

        setAccountData(accounts);

        if (accounts.length > 0) {
          const storedAccountData = localStorage.getItem("accountData");
          if (!storedAccountData) {
            localStorage.setItem("accountData", JSON.stringify(accounts[0]));
            setSelectedAccountData(accounts[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  async function handleAddAccount(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      account_name: accountName,
      account_number: accountNumber,
      initial_balance: initialBalance,
    };

    try {
      await accountService.addAccount(token, data);
      alert("Account added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding account");
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={showNewAccountDialog} onOpenChange={setShowNewAccountDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a account"
            className="w-[200px] justify-between content-center"
          >
            <span className="mr-2">
              <FaMoneyCheck size="15" />
            </span>
            {selectedAccountData?.account_name || "Select an account"}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search account..." />
              <CommandEmpty>No account found.</CommandEmpty>
              <CommandGroup>
                {accountData.map((account) => (
                  <CommandItem
                    key={String(account.id)}
                    onSelect={() => {
                      setOpen(false);
                      setSelectedAccount(account.id);
                      setSelectedAccountData(account);
                      console.log("inside onselect", account);

                      localStorage.setItem(
                        "accountData",
                        JSON.stringify(account)
                      );
                    }}
                    className="text-sm"
                  >
                    <span className="mr-2">
                      <FaMoneyCheck size="15" />
                    </span>
                    {account.account_name}
                    {selectedAccount === account.id && (
                      <CheckIcon className="ml-auto h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>

            <CommandSeparator />

            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewAccountDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Account
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
            Add a new account to track the transactions.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Account Name</Label>
              <Input
                id="accountName"
                placeholder="HDFC Bank"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Initial Balance</Label>
              <Input
                id="initialBalance"
                placeholder="15000"
                type="number"
                // value={initialBalance}
                onChange={(e) => setInitialBalance(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewAccountDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddAccount}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              " "
            )}
            Add Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
