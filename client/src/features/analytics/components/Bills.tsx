import React from "react";
import SingleBillsCard from "./SingleBillsCard";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

const Bills = () => {
  return (
    <ScrollArea className="whitespace-nowrap rounded-">
      <div className="flex space-x-4 p-4">
        <SingleBillsCard />
        <SingleBillsCard />
        <SingleBillsCard />
        <SingleBillsCard />
        <SingleBillsCard />
        <SingleBillsCard />
        <SingleBillsCard />
        <SingleBillsCard />
      </div>
      <ScrollBar className="" orientation="horizontal" />
    </ScrollArea>
  );
};

export default Bills;
