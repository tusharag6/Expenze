import { useState, useEffect } from "react";
import { Transaction, columns } from "../components/Columns";
import { DataTable } from "../components/DataTable";
import { useSelectedAccount } from "../context/AccountContext";
import { format, parseISO } from "date-fns";

const Activity = () => {
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
  }, [selectedAccountData, transactionData]);
  let formattedTransactions = transactionData;
  if (transactionData) {
    formattedTransactions = transactionData
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
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your transactions !
          </p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <UserNav />
        </div> */}
      </div>
      <DataTable data={formattedTransactions} columns={columns} />
      {/* <RecentTransaction /> */}
    </div>
  );
};

export default Activity;
