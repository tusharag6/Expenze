import React, { useEffect } from "react";
import SingleBillsCard from "./SingleBillsCard";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { SkeletonBills } from "../../bills/components/Skeleton";
import { setSubscriptions } from "../../subscription/reducers/subscriptionSlice";
import { subscriptionService } from "../../subscription";

const Subscriptions = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { data: subscriptionData, isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const subscriptions = await subscriptionService.fetchSubscriptions(token);
      return subscriptions;
    },
  });

  useEffect(() => {
    if (subscriptionData) {
      dispatch(
        setSubscriptions({
          subscriptionData,
        })
      );
    }
  }, [subscriptionData, dispatch]);

  return (
    <ScrollArea className="whitespace-nowrap rounded">
      <div className="flex space-x-4 p-4">
        {isLoading ? (
          <SkeletonBills />
        ) : (
          // subscriptionData &&
          // subscriptionData.map((subscription: any) => (
          //   <SingleBillsCard
          //     key={subscription.id}
          //     title={subscription.subscriptionName}
          //     img={subscription.img}
          //     amount={subscription.monthlyCost}
          //     date={subscription.renewalDate}
          //   />
          // ))
          ""
        )}
      </div>
      <ScrollBar className="" orientation="horizontal" />
    </ScrollArea>
  );
};

export default Subscriptions;
