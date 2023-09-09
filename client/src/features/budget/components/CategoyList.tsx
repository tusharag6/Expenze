import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Separator } from "../../../../components/ui/separator";

const budgetData = [
  { category: "Food", amount: 500 },
  { category: "Rent", amount: 1000 },
  { category: "Utilities", amount: 300 },
  { category: "Food", amount: 500 },
  { category: "Rent", amount: 1000 },
  { category: "Utilities", amount: 300 },
  { category: "Food", amount: 500 },
  { category: "Rent", amount: 1000 },
  { category: "Utilities", amount: 300 },
  { category: "Food", amount: 500 },
  { category: "Rent", amount: 1000 },
  { category: "Utilities", amount: 300 },
];

export default function CategoryList() {
  return (
    <ScrollArea className=" h-72 w-100 rounded-md border">
      <div className="p-4">
        {budgetData.map((budgetItem, index) => (
          <div key={index} className="flex justify-between  items-center py-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="text-md pl-3">{budgetItem.category}</div>
            <div className="ml-auto font-medium">${budgetItem.amount}</div>
          </div>
        ))}
        <Separator className="my-2" />
      </div>
    </ScrollArea>
  );
}
