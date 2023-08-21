"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

export function Ov2() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={80}
          fill="#82ca9d"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
