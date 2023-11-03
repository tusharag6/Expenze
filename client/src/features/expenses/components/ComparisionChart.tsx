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
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { budgetService } from "../../budget";

interface Data {
  category: String;
  budgetedAmount: number;
  actualSpending: number;
  isOverBudget: boolean;
}

const ComparisionChart: React.FC = () => {
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
  const customTooltipStyle = {
    backgroundColor: "#040D12",
    border: "0px",
    color: "#F9F7F7",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
  };
  return (
    <BarChart width={1500} height={300} data={barChartData}>
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
      <Bar dataKey="budgetedAmount" fill="#71C9CE" name="Budget" />
      <Bar dataKey="actualSpending" fill="#E3FDFD" name="Actual" />
    </BarChart>
  );
};

export default ComparisionChart;
