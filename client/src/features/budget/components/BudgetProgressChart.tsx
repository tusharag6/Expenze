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

const data = [
  { date: "2023-09-01", spending: 100 },
  { date: "2023-09-02", spending: 150 },
  { date: "2023-09-03", spending: 120 },
];

const BudgetProgressLineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="spending"
          stroke="#0088FE"
          name="Spending"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BudgetProgressLineChart;
