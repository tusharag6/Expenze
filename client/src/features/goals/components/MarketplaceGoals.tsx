import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { GoalsCard } from "./MarketplaceGoalsCard";

const realGoals = [
  {
    id: 1,
    name: "Buy a New Car",
    targetDate: "2023-12-31",
  },
  {
    id: 2,
    name: "Vacation in Hawaii",
    targetDate: "2024-07-15",
  },
  {
    id: 3,
    name: "Renovate the House",
    targetDate: "2023-10-01",
  },
  {
    id: 4,
    name: "Start a Business",
    targetDate: "2024-06-30",
  },
  {
    id: 5,
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
            <Link to={`/personal/goals/${goal.id}`}>
              <GoalsCard
                key={index}
                goals={goal}
                aspectRatio="portrait"
                width={150}
                height={150}
              />
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default MarketplaceGoals;
