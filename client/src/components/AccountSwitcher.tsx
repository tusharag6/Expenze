import { useEffect, useState } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useAuth } from "../context/AuthContext";
import { useSelectedAccount } from "../context/AccountContext";
import { Icons } from "./Icons";

interface Account {
  account_name: String;
  account_number: String;
  id: Number;
  initial_balance: Number;
  user_id: Number;
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
        const response = await fetch("http://localhost:8080/accounts", {
          method: "GET",
          headers: {
            authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const storedAccountData = localStorage.getItem("accountData");

          setAccountData(data);
          // console.log(data);
          if (data.length > 0 && !storedAccountData) {
            localStorage.setItem("accountData", JSON.stringify(data[0]));
          }
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Load selected account data from local storage when component mounts

  // console.log("account data", accountData);
  console.log("selected account", selectedAccountData);

  // localStorage.setItem("accountData", JSON.stringify(accountData[0]));

  async function handleAddAccount(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      accountName,
      accountNumber,
      initialBalance,
    };
    console.log(data);

    try {
      // Make an API request to add the new transaction
      const response = await fetch("http://localhost:8080/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Account added");
      } else {
        const errorData = await response.json();
        alert("Error");
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
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
            className="w-[200px] justify-between"
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
              // src={`https://avatar.vercel.sh/${selectedAccount.value}.png`}
              // alt={selectedAccount.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
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
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        // src={`https://avatar.vercel.sh/${account.value}.png`}
                        // alt={account.label}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
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
