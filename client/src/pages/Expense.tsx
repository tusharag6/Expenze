import React from "react";
import ComparisionChart from "../features/expenses/components/ComparisionChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import ExpenseBreakdown from "../features/expenses/components/ExpenseBreakdown";
import { Separator } from "../../components/ui/separator";

const Expense = () => {
  return (
    <div className="flex-1 space-y-4 pt-6 md:px-7 h-full mb-4">
      <div className="flex-col border-none data-[state=active]:flex ">
        <div className="flex items-center justify-between ">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Expense Breakdown
            </h2>
            <p className="text-sm text-muted-foreground">
              Get a detailed view of your spending habits.
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Expense Comparision</CardTitle>
            <div className="space-y-2">
              <Select defaultValue="daily">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ComparisionChart />
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader className="pb-8">
            <CardTitle>Expenses Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseBreakdown />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expense;
