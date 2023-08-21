"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} barSize={20}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend verticalAlign="top" align="right" height={50} />

        <Bar dataKey="income" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
