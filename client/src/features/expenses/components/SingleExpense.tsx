import React from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { ArrowUp } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";

const SingleExpense = () => {
  return (
    <Card className="">
      <CardHeader
        className="border border-border rounded-md flex flex-row items-center justify-between px-8 font-md
      "
      >
        <div>
          <p className="text-accent-foreground">Housing</p>
          <p className="font-bold text-xl">$250.00</p>
        </div>
        <div className="font-light text-accent-foreground text-sm">
          <p className="flex justify-end text-base text-md">
            15% <ArrowUp className="ml-2 w-5" />
          </p>
          Compare to last month
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between p-2 py-4 text-muted-foreground text-lg">
          <div className="font-semibold">House Rent</div>
          <div className="text-end">
            $230.00 <br />{" "}
            <span className="text-sm font-light">17 May 2023</span>
          </div>
        </div>
        <Separator className="opacity-10" />
        <div className="flex items-center justify-between p-2 py-4 text-muted-foreground text-lg">
          <div className="font-semibold">Parking</div>
          <div className="text-end">
            $20.00 <br />{" "}
            <span className="text-sm font-light">17 May 2023</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleExpense;
