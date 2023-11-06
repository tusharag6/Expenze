import React from "react";
import SingleExpense from "./SingleExpense";

const ExpenseBreakdown = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <SingleExpense />
      <SingleExpense />
      <SingleExpense />
      <SingleExpense />
      <SingleExpense />
      <SingleExpense />
      <SingleExpense />
      <SingleExpense />
    </div>
  );
};

export default ExpenseBreakdown;
