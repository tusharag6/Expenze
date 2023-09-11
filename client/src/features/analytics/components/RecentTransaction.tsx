import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useSelectedAccount } from "../../../context/AccountContext";
import { useTransaction } from "../../../context/TransactionContext";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { dashboardService } from "..";
import { FaReceipt } from "react-icons/fa";

export default function RecentTransaction() {
  const { transactionData, updateTransactionData } = useTransaction();
  const { selectedAccountData } = useSelectedAccount();

  useEffect(() => {
    if (selectedAccountData) {
      let accountId = selectedAccountData.id;
      const fetchData = async () => {
        const data = await dashboardService.fetchRecentTransactions(accountId);

        if (JSON.stringify(data) !== JSON.stringify(transactionData)) {
          updateTransactionData(data);
        }
      };
      fetchData();
    }
  }, [selectedAccountData]);

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
          <span>
            <FaReceipt size="20" />
          </span>
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
