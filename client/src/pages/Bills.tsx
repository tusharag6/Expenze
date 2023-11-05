import React from "react";
import { Separator } from "../../components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import netflix from "../assets/netflix.jpg";

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
        <CardHeader>
          <CardTitle>
            <div className="grid grid-flow-col grid-cols-12 gap-6 pb-4">
              <p className="col-span-1">Due Date</p>
              <p className="col-span-2 pl-8">Logo</p>
              <p className="col-span-5 pl-12">Item Description</p>
              <p className="col-span-3 pl-14">Last Charge</p>
              <p className="col-span-1">Amount</p>
            </div>
          </CardTitle>
          <Separator className="opacity-20" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-col gap-6 grid-cols-12">
            <div className="col-span-1 border border-border flex flex-col justify-center items-center mr-4 rounded-sm bg-secondary text-secondary-foreground font-semibold text-3xl">
              <span className="text-muted-foreground font-normal text-sm">
                May
              </span>
              <span>15</span>
            </div>
            <div className="col-span-2 flex items-center pl-8">
              <img
                src={netflix}
                alt="netflix"
                className="h-20 rounded-lg border-border border"
              />
            </div>
            <div className="col-span-5 pr-24 pl-12">
              <p className="text-2xl font-bold pb-1">Netflix - Yearly Plan</p>
              <p className="text-muted-foreground text-sm font-light">
                For advanced security and more flexible controls, the
                Professional plan helps you scale design processes company-wide.
              </p>
            </div>
            <div className="col-span-3 text-muted-foreground text-lg flex items-center pl-14">
              14 Nov, 2023
            </div>
            <div className="col-span-1 border border-border flex flex-col justify-center items-center ml-4 my-6 rounded-sm  font-semibold text-2xl">
              $499
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;
