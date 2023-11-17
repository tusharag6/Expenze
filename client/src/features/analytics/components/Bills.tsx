import SingleBillsCard from "./SingleBillsCard";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { billsService } from "../../bills";
import { SkeletonBills } from "../../bills/components/Skeleton";
import { useEffect } from "react";
import { setBills } from "../../bills/reducers/billsSlice";

const Bills = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { data: billsData, isLoading } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const bills = await billsService.fetchBills(token);
      return bills;
    },
  });

  useEffect(() => {
    if (billsData) {
      dispatch(
        setBills({
          billsData,
        })
      );
    }
  }, [billsData, dispatch]);

  return (
    <ScrollArea className="whitespace-nowrap rounded">
      <div className="flex space-x-4 p-4">
        {isLoading ? (
          <SkeletonBills />
        ) : (
          billsData.map((bill: any) => (
            <SingleBillsCard
              key={bill.id}
              title={bill.billName}
              img={bill.img}
              amount={bill.billAmount}
              date={bill.dueDate}
            />
          ))
        )}
      </div>
      <ScrollBar className="" orientation="horizontal" />
    </ScrollArea>
  );
};

export default Bills;
