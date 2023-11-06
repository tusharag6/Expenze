import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { GoalsCard } from "./GoalsCard";

const realGoals = [
  {
    id: 1,
    name: "Buy a New Car",
    targetDate: "2023-12-31",
    amount: 10000,
  },
  {
    id: 2,
    name: "Vacation in Hawaii",
    targetDate: "2024-07-15",
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

const PersonalGoals = () => {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex w-max space-x-4 pb-4">
          {realGoals.map((goal, index) => (
            <Link to={`/personal/goals/${goal.id}`}>
              <GoalsCard
                key={index}
                goals={goal}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PersonalGoals;
