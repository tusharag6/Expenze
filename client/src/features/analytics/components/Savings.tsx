import React from "react";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import SingeSavingsCard from "./SingeSavingsCard";
import { Separator } from "../../../../components/ui/separator";

const Savings = () => {
  return (
    <ScrollArea className="h-[28rem]">
      <div className="p-0 flex flex-col gap-4">
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
        <SingeSavingsCard />
        <Separator />
      </div>
    </ScrollArea>
  );
};

export default Savings;
