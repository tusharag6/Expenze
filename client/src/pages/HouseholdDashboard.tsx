import { Separator } from "../../components/ui/separator";
import EmptyPlaceholderHousehold from "../features/household/components/EmptyPlaceholderHousehold";

const HouseholdDashboard = () => {
  return (
    <div className="h-full flex-col border-none p-8 data-[state=active]:flex">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your Household Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your finances with ease.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <EmptyPlaceholderHousehold
        title="No Household Joined or Created"
        description="You haven't joined or created. Start by new a new household."
      />
    </div>
  );
};

export default HouseholdDashboard;
