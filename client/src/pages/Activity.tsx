import { useEffect } from "react";
import { columns } from "../components/Columns";
import { DataTable } from "../components/DataTable";
import { useSelectedAccount } from "../context/AccountContext";
import { format, parseISO } from "date-fns";
import { useTransaction } from "../context/TransactionContext";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";

const Activity = () => {
  const { transactionData, updateTransactionData } = useTransaction();
  const { selectedAccountData } = useSelectedAccount();
  let accountId = selectedAccountData?.id;
  useEffect(() => {
    if (selectedAccountData) {
      const fetchTransactionData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/transactions/accounts/${accountId}`
          );
          const data = await response.json();
          updateTransactionData(data);
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
    <div className="flex-1 space-y-4 pt-6 md:px-7 h-full mb-4">
      <div className="flex-col border-none data-[state=active]:flex ">
        <div className="flex items-center justify-between ">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your Transaction History
            </h2>
            <p className="text-sm text-muted-foreground">
              Stay on top of your finances.
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>
        </Tabs>
        <DataTable
          data={formattedTransactions}
          columns={columns}
          border-border
        />
        {/* <RecentTransaction /> */}
      </div>
    </div>
  );
};

export default Activity;
