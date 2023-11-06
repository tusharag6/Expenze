import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const yearData = [
  { category: "January", income: 5000, expense: 4200 },
  { category: "February", income: 5500, expense: 4000 },
  { category: "March", income: 5900, expense: 5900 },
  { category: "April", income: 5200, expense: 4400 },
  { category: "May", income: 6000, expense: 6100 },
  { category: "June", income: 5600, expense: 5500 },
  { category: "July", income: 5800, expense: 4200 },
  { category: "August", income: 6000, expense: 3600 },
  { category: "September", income: 5500, expense: 5700 },
  { category: "October", income: 5700, expense: 4500 },
  { category: "November", income: 6100, expense: 6000 },
  { category: "December", income: 5900, expense: 5300 },
];

const ComparisionChart: React.FC = () => {
  const customTooltipStyle = {
    backgroundColor: "#040D12",
    border: "0px",
    color: "#F9F7F7",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
  };
  return (
    <BarChart width={1500} height={300} data={yearData}>
      <CartesianGrid vertical={false} strokeDasharray="4 4" opacity={0.1} />
      <XAxis
        dataKey="category"
        stroke="#E3FDFD"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis stroke="#E3FDFD" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip
        contentStyle={customTooltipStyle}
        cursor={{ fill: "transparent" }}
      />
      <Legend />
      <Bar dataKey="income" fill="#71C9CE" name="Income" />
      <Bar dataKey="expense" fill="#E3FDFD" name="Expense" />
    </BarChart>
  );
};

export default ComparisionChart;
