import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import netflix from "../../../assets/netflix.jpg";
import { ChevronRight } from "lucide-react";

const SingleBillsCard = () => {
  return (
    <Card className="rounded-sm">
      <CardHeader className="py-4 justify-between flex flex-row items-center ">
        <div className="flex flex-row gap-4 items-center">
          <img
            src={netflix}
            alt="netflix"
            className="h-8 w-8 rounded-lg border-border border"
          />
          <CardTitle className="font-semibold">Netflix</CardTitle>
        </div>
        <ChevronRight />
      </CardHeader>
      <Separator />
      <CardContent
        className="space-x-28 flex items-center
      justify-between py-4"
      >
        <p className="font-semibold text-lg">
          $125 <span className="text-muted-foreground text-sm">.00</span>{" "}
        </p>
        <p className="text-muted-foreground text-sm">22/11/2023</p>
      </CardContent>
    </Card>
  );
};

export default SingleBillsCard;
