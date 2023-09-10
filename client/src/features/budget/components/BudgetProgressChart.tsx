import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { budgetService } from "..";

interface Data {
  intervalStart: string;
  intervalEnd: string;
  intervalSpending: number;
}

const BudgetProgressLineChart: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<Data[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const data = await budgetService.fetchBudgetProgressLineChartData(token);
      console.log("data", data);

      if (data) {
        setLineChartData(data);
      }
    };
    fetchData();
  }, []);
  // Custom tick formatter for X-axis
  const customTickFormatter = (tick: string) => {
    const date = new Date(tick);
    const day = date.getDate();
    const monthAbbreviation = date.toLocaleString("default", {
      month: "short",
    });
    return `${day} ${monthAbbreviation}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="intervalStart" tickFormatter={customTickFormatter} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="intervalSpending"
          stroke="#0088FE"
          name="Spending"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BudgetProgressLineChart;
