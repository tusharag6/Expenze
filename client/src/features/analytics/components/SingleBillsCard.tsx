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

type SingleBillsCardProps = {
  title: string;
  img?: string;
  amount: number;
  date: string;
};

const SingleBillsCard = (props: SingleBillsCardProps) => {
  const { title, img, amount, date } = props;

  return (
    <Card className="rounded-sm">
      <CardHeader className="py-4 justify-between flex flex-row items-center ">
        <div className="flex flex-row gap-4 items-center">
          {img ? (
            <img
              src={img}
              alt="netflix"
              className="h-8 w-8 rounded-lg border-border border"
            />
          ) : (
            <img
              src={netflix}
              alt="netflix"
              className="h-8 w-8 rounded-lg border-border border"
            />
          )}
          <CardTitle className="font-semibold">{title}</CardTitle>
        </div>
        <ChevronRight />
      </CardHeader>
      <Separator />
      <CardContent
        className="space-x-28 flex items-center
      justify-between py-4"
      >
        <p className="font-semibold text-lg">
          ${amount} <span className="text-muted-foreground text-sm">.00</span>{" "}
        </p>
        <p className="text-muted-foreground text-sm">{date}</p>
      </CardContent>
    </Card>
  );
};

export default SingleBillsCard;
