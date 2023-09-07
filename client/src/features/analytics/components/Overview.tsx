"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelectedAccount } from "../../../context/AccountContext";
import { useAuth } from "../../../context/AuthContext";
import { dashboardService } from "..";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: "Income" | "Expense";
  budgetCategory: string | null;
  description: string | null;
  account_id: number;
}

export function Overview() {
  const { token } = useAuth();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const { selectedAccountData } = useSelectedAccount();

  useEffect(() => {
    if (selectedAccountData) {
      const accountId = selectedAccountData.id;

      const fetchData = async () => {
        const data = await dashboardService.fetchTransactionData(
          accountId,
          token
        );
        setTransactionData(data);
      };

      fetchData();
    }
  }, [selectedAccountData, token]);

  const expenseData = transactionData.filter(
    (transaction) => transaction.type === "Expense"
  );

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={expenseData}>
        <XAxis
          dataKey="date"
          stroke="#888888"
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
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="amount"
          name="Income"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
