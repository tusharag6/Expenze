import { Separator } from "../../components/ui/separator";
import EmptyPlaceholderHousehold from "../features/household/components/EmptyPlaceholderHousehold";
import EmptyPlaceholder from "../layout/EmptyPlaceholder";
import InviteMembers from "../features/household/components/InviteMembers";
import AddAccount from "../features/household/components/AddAccount";
import SummaryCards from "../features/analytics/components/SummaryCards";

const HouseholdDashboard = () => {
  const isEmpty: boolean = false;
  const isMemberPresent: boolean = true;
  const isAccountPresent: boolean = true;
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
        ) : (
          <div className="flex space-x-4">
            <InviteMembers />
            <AddAccount />
          </div>
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
          <SummaryCards />
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
