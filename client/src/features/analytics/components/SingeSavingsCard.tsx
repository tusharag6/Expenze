import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardContent } from "../../../../components/ui/card";
import { ChevronRight } from "lucide-react";
const SingeSavingsCard = () => {
  const percentage = 66;
  return (
    <Card className="w-60 border-transparent">
      <CardContent className="flex gap-5 py-2 px-3 items-center">
        <div className="h-16 w-16">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <div className="text-center flex justify-between items-center ">
          <div className="pr-9">
            <p className="font-semibold text-2xl pb-2">$2000</p>
            <p className="font-light text-sm">Invest</p>
          </div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SingeSavingsCard;
