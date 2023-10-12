import { Separator } from "../../components/ui/separator";
import EmptyPlaceholderHousehold from "../features/household/components/EmptyPlaceholderHousehold";
import EmptyPlaceholder from "../layout/EmptyPlaceholder";
import InviteMembers from "../features/household/components/InviteMembers";
import AddAccount from "../features/household/components/AddAccount";
import SummaryCards from "../features/analytics/components/SummaryCards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Overview } from "../features/analytics/components/Overview";
import RecentTransaction from "../features/analytics/components/RecentTransaction";

const HouseholdDashboard = () => {
  const userRole = localStorage.getItem("Role");
  const householdData = localStorage.getItem("householdData");
  const isEmpty = householdData ? false : true;
  console.log(userRole, householdData, false);

  const isMemberPresent: boolean = false;
  const isAccountPresent: boolean = false;
  return (
    <div className="h-full flex-col border-none p-8 data-[state=active]:flex">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome to Your Household
          </h2>
          <p className="text-sm text-muted-foreground">
            Get started with managing your household's finances.
          </p>
        </div>
        {isEmpty ? (
          ""
        ) : userRole === "Owner" ? (
          <div className="flex space-x-4">
            <InviteMembers />
            <AddAccount />
          </div>
        ) : (
          <AddAccount />
        )}
      </div>
      <Separator className="my-4" />
      {isEmpty ? (
        <EmptyPlaceholderHousehold
          title="No Household Yet"
          description="It looks like you haven't joined or created a household. Start by creating a new one."
        />
      ) : isMemberPresent ? (
        isAccountPresent ? (
          <>
            <SummaryCards />
            <div className="grid gap-4 grid-cols-2 pt-4 lg:grid-cols-7">
              {/* Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>

              {/* Recent Transaction */}
              <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    {/* You made 265 sales this month. */}
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <RecentTransaction />
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <EmptyPlaceholder
            title="No accounts Added"
            description="It looks like your household does not have any accounts added. Start by adding one."
          />
        )
      ) : (
        <EmptyPlaceholder
          title="No Members Yet"
          description="It looks like your household does not have members. Start by inviting one."
        />
      )}
    </div>
  );
};

export default HouseholdDashboard;
