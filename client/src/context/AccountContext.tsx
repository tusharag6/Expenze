import { createContext, useContext, ReactNode, useState } from "react";

interface Account {
  account_name: String;
  account_number: String;
  id: number;
  initial_balance: number;
  user_id: number;
}

interface AccountContextType {
  selectedAccountData: Account | null;
  setSelectedAccountData: (account: Account | null) => void;
  clearSelectedAccountData: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function useSelectedAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useSelectedAccount must be used within a AccountProvider");
  }
  return context;
}

interface AccountProviderProps {
  children: ReactNode;
}

export function AccountProvider({ children }: AccountProviderProps) {
  const storedAccountData = localStorage.getItem("accountData");
  const parsedAccountData = storedAccountData
    ? JSON.parse(storedAccountData)
    : null;

  const [selectedAccountData, setSelectedAccountData] =
    useState<Account | null>(parsedAccountData);

  const clearSelectedAccountData = () => {
    setSelectedAccountData(null);
    localStorage.removeItem("accountData");
  };

  return (
    <AccountContext.Provider
      value={{
        selectedAccountData,
        setSelectedAccountData,
        clearSelectedAccountData,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
