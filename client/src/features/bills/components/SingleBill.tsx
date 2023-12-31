import React from "react";
import netflix from "../../../assets/netflix.jpg";
import { Separator } from "../../../../components/ui/separator";
import { format, parseISO } from "date-fns";

type SingleBillsProps = {
  billName: string;
  img?: string;
  billAmount: number;
  isRecurring: boolean;
  interval?: string;
  category?: string;
  dueDate: Date;
};

const SingleBill = (props: SingleBillsProps) => {
  const { img, billName, dueDate, billAmount } = props;
  const day = new Date(dueDate);
  const dateDay = day.getDay();
  const dateMonth = format(day, "MMM");
  return (
    <div className="my-8">
      <div className="grid grid-flow-col gap-6 grid-cols-12 pb-8">
        <div className="col-span-1 border border-border flex flex-col justify-center items-center mr-4 rounded-sm bg-secondary text-secondary-foreground font-semibold text-3xl">
          <span className="text-muted-foreground font-normal text-md">
            {dateDay}
          </span>
          <span>{dateMonth}</span>
        </div>
        <div className="col-span-2 flex items-center pl-8">
          <img
            src={img ? img : netflix}
            alt="netflix"
            className="h-20 w-36 rounded-lg border-border border"
          />
        </div>
        <div className="col-span-5 pr-24 pl-12">
          <p className="text-2xl font-bold pb-1">{props.billName}</p>
          <p className="text-muted-foreground text-sm font-light">
            For advanced security and more flexible controls, the Professional
            plan helps you scale design processes company-wide.
          </p>
        </div>
        <div className="col-span-3 text-muted-foreground text-lg flex items-center pl-14">
          {day.toISOString()}
        </div>
        <div className="col-span-1 border border-border flex flex-col justify-center items-center ml-4 my-6 rounded-sm  font-semibold text-2xl">
          ${billAmount}
        </div>
      </div>
      <Separator className="opacity-20" />
    </div>
  );
};

export default SingleBill;
