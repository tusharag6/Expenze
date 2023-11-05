import React from "react";
import netflix from "../../../assets/netflix.jpg";
import { Separator } from "../../../../components/ui/separator";

type SingleBillsProps = {
  billName: string;
  img?: string;
  amount: number;
  dateMonth: string;
  dateDay: string;
  lastDate: string;
};

const SingleBill = (props: SingleBillsProps) => {
  const { dateMonth, dateDay, img, billName, lastDate, amount } = props;
  return (
    <div className="my-8">
      <div className="grid grid-flow-col gap-6 grid-cols-12 pb-8">
        <div className="col-span-1 border border-border flex flex-col justify-center items-center mr-4 rounded-sm bg-secondary text-secondary-foreground font-semibold text-3xl">
          <span className="text-muted-foreground font-normal text-sm">
            {dateMonth}
          </span>
          <span>{dateDay}</span>
        </div>
        <div className="col-span-2 flex items-center pl-8">
          <img
            src={img ? img : netflix}
            alt="netflix"
            className="h-20 w-36 rounded-lg border-border border"
          />
        </div>
        <div className="col-span-5 pr-24 pl-12">
          <p className="text-2xl font-bold pb-1">{billName}</p>
          <p className="text-muted-foreground text-sm font-light">
            For advanced security and more flexible controls, the Professional
            plan helps you scale design processes company-wide.
          </p>
        </div>
        <div className="col-span-3 text-muted-foreground text-lg flex items-center pl-14">
          {lastDate}
        </div>
        <div className="col-span-1 border border-border flex flex-col justify-center items-center ml-4 my-6 rounded-sm  font-semibold text-2xl">
          ${amount}
        </div>
      </div>
      <Separator className="opacity-20" />
    </div>
  );
};

export default SingleBill;
