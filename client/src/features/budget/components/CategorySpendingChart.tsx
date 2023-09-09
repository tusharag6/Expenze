import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Category A", value: 1000 },
  { name: "Category B", value: 1500 },
  { name: "Category C", value: 500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Define colors for the pie chart segments

const CategorySpendingPieChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategorySpendingPieChart;
