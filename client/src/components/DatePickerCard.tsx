import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import DatePickerWithRange from "./DatePickerWithRange";

export function DatePickerCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <DatePickerWithRange className="[&>button]:w-[260px]" />
        </div>
      </CardContent>
    </Card>
  );
}
