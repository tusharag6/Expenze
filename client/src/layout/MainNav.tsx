import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [selected, setSelected] = useState("Overview");
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link to="/personal/dashboard">
        <Button
          variant={selected === "Overview" ? "secondary" : "ghost"}
          className="w-full justify-start text-base py-4 my-1"
          onClick={() => {
            setSelected("Overview");
          }}
        >
          Overview
        </Button>
      </Link>
      <Link to="/personal/activity">
        <Button
          variant={selected === "Activity" ? "secondary" : "ghost"}
          className="w-full justify-start text-base py-4 my-1"
          onClick={() => {
            setSelected("Activity");
          }}
        >
          Transactions
        </Button>
      </Link>
      <Link to="/personal/expenses">
        <Button
          variant={selected === "Expenses" ? "secondary" : "ghost"}
          className="w-full justify-start text-base py-4 my-1"
          onClick={() => {
            setSelected("Expenses");
          }}
        >
          Expenses
        </Button>
      </Link>

      <Link to="/personal/budget">
        <Button
          variant={selected === "Budget" ? "secondary" : "ghost"}
          className="w-full justify-start text-base py-4 my-1"
          onClick={() => {
            setSelected("Budget");
          }}
        >
          Budget
        </Button>
      </Link>
      <Link to="/personal/bills">
        <Button
          variant={selected === "Bills" ? "secondary" : "ghost"}
          className="w-full justify-start text-base py-4 my-1"
          onClick={() => {
            setSelected("Bills");
          }}
        >
          Bills
        </Button>
      </Link>
      <Link to="/personal/goals">
        <Button
          variant={selected === "Goal" ? "secondary" : "ghost"}
          className="w-full justify-start text-base py-4 my-1"
          onClick={() => {
            setSelected("Goal");
          }}
        >
          Goal
        </Button>
      </Link>
    </nav>
  );
}
