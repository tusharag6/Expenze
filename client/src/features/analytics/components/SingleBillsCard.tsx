import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { ChevronRight } from "lucide-react";
import { Icons } from "../../../components/Icons";
import { format } from "date-fns";

type SingleBillsCardProps = {
  title: string;
  img?: string;
  amount: number;
  date: string;
};

const SingleBillsCard = (props: SingleBillsCardProps) => {
  const { title, img, amount, date } = props;

  function formatDate(inputDate: string) {
    const day = new Date(inputDate);
    const dateDay = day.getDay();
    const dateMonth = format(day, "MMM");
    return `${dateDay} ${dateMonth}`;
  }

  return (
    <Card className="rounded-sm">
      <CardHeader className="py-4 justify-between flex flex-row items-center content-center gap-12">
        <div className="flex flex-row gap-3 items-center">
          {img ? (
            <img
              src={img}
              className="h-6 w-6 rounded-lg border-border border"
            />
          ) : (
            <Icons.receipt className="h-5 w-5" />
          )}
          <CardTitle className="font-semibold text-lg">{title}</CardTitle>
        </div>
        <ChevronRight className="pb-1" />
      </CardHeader>
      <Separator />
      <CardContent
        className="flex items-center
      justify-between py-4"
      >
        <p className="font-semibold text-base">
          ${amount} <span className="text-muted-foreground text-sm">.00</span>{" "}
        </p>
        <p className="text-muted-foreground text-sm">{formatDate(date)}</p>
      </CardContent>
    </Card>
  );
};

export default SingleBillsCard;
