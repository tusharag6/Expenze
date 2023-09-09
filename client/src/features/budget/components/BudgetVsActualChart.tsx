import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { category: "Category A", budget: 2000, actual: 1800 },
  { category: "Category B", budget: 1500, actual: 1600 },
  { category: "Category C", budget: 3000, actual: 2800 },
];

const BudgetVsActualBarChart: React.FC = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="budget" fill="#0088FE" name="Budget" />
      <Bar dataKey="actual" fill="#FF8042" name="Actual" />
    </BarChart>
  );
};

export default BudgetVsActualBarChart;
