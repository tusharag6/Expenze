import React, { createContext, useContext, useState, ReactNode } from "react";

interface TransactionContextType {
  transactionData: Transaction[];
  updateTransactionData: (newData: Transaction[]) => void;
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: "Income" | "Expense";
  budgetCategory: string | null;
  description: string | null;
  account_id: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  const updateTransactionData = (newData: Transaction[]) => {
    setTransactionData(newData);
  };

  const contextValue: TransactionContextType = {
    transactionData,
    updateTransactionData,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
