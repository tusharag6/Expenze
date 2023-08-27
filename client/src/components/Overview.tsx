"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelectedAccount } from "../context/AccountContext";
import { useAuth } from "../context/AuthContext";

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
  }, [selectedAccountData, token]);

  const incomeData = transactionData.filter(
    (transaction) => transaction.type === "Income"
  );

  const expenseData = transactionData.filter(
    (transaction) => transaction.type === "Expense"
  );
  const isHorizontal = incomeData.length < 8 && expenseData.length < 8;

  return (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"}`}>
      {/* <h2>Income</h2> */}
      <ResponsiveContainer width={isHorizontal ? "50%" : "100%"} height={350}>
        <BarChart data={incomeData} barSize={40}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })
            }
          />
          <YAxis stroke="#888888" tickFormatter={(value) => `$${value}`} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={50} />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Bar
            dataKey="amount"
            name="Income"
            fill="#adfa1d"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* <h2>Expense</h2> */}
      <ResponsiveContainer width={isHorizontal ? "50%" : "100%"} height={350}>
        <BarChart data={expenseData} barSize={40}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })
            }
          />
          <YAxis stroke="#888888" tickFormatter={(value) => `$${value}`} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={50} />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Bar
            dataKey="amount"
            name="Expense"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
