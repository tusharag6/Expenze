import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedAccount } from "../../../context/AccountContext";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "..";

const IncomeVsExpenseGraph = () => {
  const { token } = useAuth();
  const { selectedAccountData } = useSelectedAccount();
  const accountId = selectedAccountData?.id;

  const { data: transactionData } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const transactions = await dashboardService.fetchTransactionData(
        accountId,
        token
      );
      return transactions;
    },
  });

  const expenseData = transactionData?.filter(
    (transaction) => transaction.type === "Expense"
  );

  const incomeData = transactionData?.filter(
    (transaction) => transaction.type === "Income"
  );
  // console.log(timeFrame, filteredData);

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Spending Trends</CardTitle>
        <div className="space-y-2">
          <Select defaultValue="daily">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0 pr-6 pb-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart>
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              opacity={0.1}
            />
            <XAxis
              dataKey="date"
              stroke="#E3FDFD"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <YAxis
              stroke="#E3FDFD"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              name="Income"
              stroke="#71C9CE"
              strokeWidth={2}
              data={incomeData}
            />
            <Line
              type="monotone"
              dataKey="amount"
              name="Expense"
              stroke="#71C9CE"
              strokeWidth={2}
              data={expenseData}
            />
          </LineChart>
        </ResponsiveContainer>{" "}
      </CardContent>
    </Card>
  );
};

export default IncomeVsExpenseGraph;
