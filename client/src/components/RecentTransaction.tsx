import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useSelectedAccount } from "../context/AccountContext";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: "Income" | "Expense";
  budgetCategory: string | null;
  description: string | null;
  account_id: number;
}

export default function RecentTransaction() {
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const { selectedAccountData } = useSelectedAccount();
  let accountId = selectedAccountData?.id;
  useEffect(() => {
    if (selectedAccountData) {
      const fetchTransactionData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/accounts/${accountId}/transactions`
          );
          const data = await response.json();
          setTransactionData(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTransactionData();
    }
  }, [selectedAccountData]);
  let formattedTransactions = transactionData;
  if (transactionData) {
    formattedTransactions = transactionData
      .slice(0, 5)
      .map((transaction) => ({
        ...transaction,
        date: format(parseISO(transaction.date), "dd MMM hh:mm a"),
        description: transaction.description
          ? transaction.description.slice(0, 15) +
            (transaction.description.length > 15 ? "..." : "")
          : "",
      }))
      .reverse();
  }
  return (
    <div className="container">
      <DataTable columns={columns} data={formattedTransactions} />
    </div>
  );
}
