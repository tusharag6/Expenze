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
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "../../../components/Toast";

export default function AccountSwitcher() {
  const [open, setOpen] = useState(false);
  const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Number>();
  const { selectedAccountData, setSelectedAccountData } = useSelectedAccount();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);

  const { data: accountData, refetch } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const accounts = await accountService.fetchAccounts(token);
      return accounts;
    },
  });

  const addAccountMutation = useMutation({
    mutationFn: async (data: any) => {
      await accountService.addAccount(token, data);
    },
    onSuccess: () => {
      console.log("Account added successfully");
      Toast.fire({
        icon: "success",
        title: "Account added successfully",
      });
      refetch();
    },
    onError: (error) => {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "Uh oh! Something went wrong.",
        text: "There was a problem with creating your account.",
      });
    },
  });
  async function handleAddAccount(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      account_name: accountName,
      account_number: accountNumber,
      initial_balance: initialBalance,
    };
    await addAccountMutation.mutateAsync(data);
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
            className="w-[200px] justify-between content-center items-center"
          >
            <span className="mr-2">
              <Icons.bank className="h-4 w-4" />
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
                {accountData?.map((account) => (
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
                      <Icons.bank className="h-4 w-4" />
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
          <Button type="submit" onClick={handleAddAccount} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Add Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
