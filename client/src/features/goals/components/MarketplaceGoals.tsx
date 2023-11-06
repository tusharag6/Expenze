import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { GoalsCard } from "./MarketplaceGoalsCard";

const realGoals = [
  {
    id: 1,
    name: "Buy a New Car",
    amount: 10000,
  },
  {
    id: 2,
    name: "Vacation in Hawaii",
    amount: 5000,
  },
  {
    id: 3,
    name: "Renovate the House",
    targetDate: "2023-10-01",
    amount: 20000,
  },
  {
    id: 4,
    name: "Start a Business",
    targetDate: "2024-06-30",
    amount: 100000,
  },
  {
    id: 5,
    name: "Save for Retirement",
    targetDate: "2030-12-31",
    amount: 1000000,
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
