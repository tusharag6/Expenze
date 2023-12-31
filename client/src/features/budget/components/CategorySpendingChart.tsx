import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { budgetService } from "..";

const COLORS = ["#71C9CE", "#A6E3E9", "#00B8A9", "#0F4C75"];
interface Data {
  name: string;
  value: number;
}
const CategorySpendingPieChart: React.FC = () => {
  const [pieChartData, setPieChartData] = useState<Data[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const data = await budgetService.fetchCategorySpendingChartData(token);

      if (data) {
        setPieChartData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {pieChartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategorySpendingPieChart;
