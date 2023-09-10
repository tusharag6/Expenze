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
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { budgetService } from "..";

interface Data {
  category: String;
  budgetedAmount: number;
  actualSpending: number;
  isOverBudget: boolean;
}

const BudgetVsActualBarChart: React.FC = () => {
  const [barChartData, setBarChartData] = useState<Data[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const data = await budgetService.fetchBudgetVsActualBarChartData(token);

      if (data) {
        setBarChartData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <BarChart width={600} height={300} data={barChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="budgetedAmount" fill="#0088FE" name="Budget" />
      <Bar dataKey="actualSpending" fill="#FF8042" name="Actual" />
    </BarChart>
  );
};

export default BudgetVsActualBarChart;
