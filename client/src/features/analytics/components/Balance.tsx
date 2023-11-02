import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { budgetService } from "../../budget";

const COLORS = ["#71C9CE", "#A6E3E9", "#00B8A9", "#0F4C75"];

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 100 },
];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Balance: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Balance;
