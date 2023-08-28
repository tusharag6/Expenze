import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { columns } from "./ColumnsRecent";
import { DataTable } from "./DataTableRecent";
import { useSelectedAccount } from "../context/AccountContext";
import { useTransaction } from "../context/TransactionContext";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

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
          ? transaction.description.slice(0, 30) +
            (transaction.description.length > 30 ? "..." : "")
          : "",
      }))
      .reverse()
      .slice(0, 6);
  }
  return (
    <div className="space-y-8">
      {formattedTransactions.map((transaction) => (
        <div className="flex items-center" key={transaction.id}>
          {" "}
          {/* Don't forget to provide a unique key */}
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.description}
            </p>
            <p className="text-sm text-muted-foreground">{transaction.type}</p>
          </div>
          <div className="ml-auto font-medium">${transaction.amount}</div>
        </div>
      ))}
    </div>
  );
}
