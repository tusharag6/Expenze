import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useSelectedAccount } from "../context/AccountContext";
import { useTransaction } from "../context/TransactionContext";

export default function RecentTransaction() {
  const { transactionData, updateTransactionData } = useTransaction();
  const { selectedAccountData } = useSelectedAccount();
  let accountId = selectedAccountData?.id;
  useEffect(() => {
    // console.log("Effect triggered");

    if (selectedAccountData) {
      const fetchTransactionData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/accounts/${accountId}/transactions`
          );
          const data = await response.json();
          if (JSON.stringify(data) !== JSON.stringify(transactionData)) {
            updateTransactionData(data);
          }
          // console.log("inside useEffect", transactionData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTransactionData();
    }
  }, [selectedAccountData]);
  // console.log("outside useEffect", transactionData);

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
      .reverse()
      .slice(0, 5);
  }
  return (
    <div className="container">
      <DataTable columns={columns} data={formattedTransactions} />
    </div>
  );
}
