import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { GoalsCard } from "./MarketplaceGoalsCard";

const realGoals = [
  {
    name: "Buy a New Car",
    targetDate: "2023-12-31",
  },
  {
    name: "Vacation in Hawaii",
    targetDate: "2024-07-15",
  },
  {
    name: "Renovate the House",
    targetDate: "2023-10-01",
  },
  {
    name: "Start a Business",
    targetDate: "2024-06-30",
  },
  {
    name: "Save for Retirement",
    targetDate: "2030-12-31",
  },
  {
    name: "Buy a New Car",
    targetDate: "2023-12-31",
  },
  {
    name: "Vacation in Hawaii",
    targetDate: "2024-07-15",
  },
  {
    name: "Renovate the House",
    targetDate: "2023-10-01",
  },
  {
    name: "Start a Business",
    targetDate: "2024-06-30",
  },
  {
    name: "Save for Retirement",
    targetDate: "2030-12-31",
  },
];

const MarketplaceGoals = () => {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex w-max space-x-4 pb-4">
          {realGoals.map((goal, index) => (
            <GoalsCard
              key={index}
              goals={goal}
              aspectRatio="portrait"
              width={150}
              height={150}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default MarketplaceGoals;
