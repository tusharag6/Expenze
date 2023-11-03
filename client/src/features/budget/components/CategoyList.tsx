import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Separator } from "../../../../components/ui/separator";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { budgetService } from "..";
import { FaThList } from "react-icons/fa";

interface Data {
  category: String;
  amount: number;
}

export default function CategoryList() {
  const [budgetData, setBudgetData] = useState<Data[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const data = await budgetService.getAllCategoriesData(token);

      if (data) {
        setBudgetData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollArea className=" h-72 w-100 rounded-md">
      <div className="p-4">
        {budgetData.map((budgetItem, index) => (
          <>
            <div
              key={index}
              className="flex justify-between  items-center py-3"
            >
              <span>
                <FaThList size="15" />
              </span>
              <div className="text-md pl-3 text-lg font-semibold">
                {budgetItem.category}
              </div>
              <div className="ml-auto">${budgetItem.amount}</div>
            </div>
            <Separator className="my-2 opacity-10" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
