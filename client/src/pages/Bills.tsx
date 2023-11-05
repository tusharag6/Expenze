import React from "react";
import { Separator } from "../../components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import SingleBill from "../features/bills/components/SingleBill";
const billsData = [
  {
    billName: "Internet",
    img: "https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-horizontal.jpg",
    amount: 60,
    dateMonth: "November",
    dateDay: "10",
    lastDate: "10 Aug 2023",
  },
  {
    billName: "Electricity",
    img: "https://listcarbrands.com/wp-content/uploads/2017/10/Tata-Motors-Logo-1988.png",
    amount: 75,
    dateMonth: "November",
    dateDay: "15",
    lastDate: "15 Oct 2023",
  },
  {
    billName: "Netflix",
    amount: 125,
    dateMonth: "November",
    dateDay: "22",
    lastDate: "22 Oct 2023",
  },
];

const Bills = () => {
  return (
    <div className="flex-1 space-y-4 pt-6 md:px-7 h-full mb-4">
      <div className="flex-col border-none data-[state=active]:flex ">
        <div className="flex items-center justify-between ">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Upcoming Bills
            </h2>
            <p className="text-sm text-muted-foreground">
              Get a detailed view of your spending habits.
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>
            <div className="grid grid-flow-col grid-cols-12 gap-6 pb-4">
              <p className="col-span-1">Due Date</p>
              <p className="col-span-2 pl-8">Logo</p>
              <p className="col-span-5 pl-12">Bill Description</p>
              <p className="col-span-3 pl-14">Last Charge</p>
              <p className="col-span-1">Amount</p>
            </div>
          </CardTitle>
          <Separator className="opacity-20" />
        </CardHeader>
        <CardContent>
          {billsData.map((bill, index) => (
            <SingleBill
              key={index}
              billName={bill.billName}
              img={bill.img}
              amount={bill.amount}
              dateMonth={bill.dateMonth}
              dateDay={bill.dateDay}
              lastDate={bill.lastDate}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;
