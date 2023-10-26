import { useState } from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMoneyBillWave,
  FaListAlt,
  FaPiggyBank,
  FaUser,
} from "react-icons/fa";
import { Separator } from "../../components/ui/separator";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <div
      className={cn("pb-12 h-[100vh]", className)}
      style={{ backgroundColor: "#191919", color: "#FFF", maxWidth: "17.5rem" }}
    >
      <div className="my-12 mx-5 flex flex-col justify-between h-full">
        <div>
          <div className="pb-10 flex justify-center">
            <img src="../../src/assets/logo.png" alt="" className="w-36" />
          </div>

          <div>
            <Link to="/personal/dashboard">
              <Button
                variant={selected === "Overview" ? "secondary" : "ghost"}
                className="w-full justify-start text-base py-4 my-1"
                onClick={() => {
                  setSelected("Overview");
                }}
              >
                <span className="pr-2">
                  <FaHome size="15" />
                </span>
                Overview
              </Button>
            </Link>
            <Link to="/personal/balance">
              <Button
                variant={selected === "Balance" ? "secondary" : "ghost"}
                className="w-full justify-start text-base py-4 my-1"
                onClick={() => {
                  setSelected("Balance");
                }}
              >
                <span className="pr-2">
                  <FaHome size="15" />
                </span>
                Balance
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
                <span className="pr-2">
                  <FaListAlt size="15" />
                </span>
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
                <span className="pr-2">
                  <FaListAlt size="15" />
                </span>
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
                <span className="pr-2">
                  <FaMoneyBillWave size="15" />
                </span>
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
                <span className="pr-2">
                  <FaListAlt size="15" />
                </span>
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
                <span className="pr-2">
                  <FaPiggyBank size="16" />
                </span>
                Goal
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant={selected === "Settings" ? "secondary" : "ghost"}
                className="w-full justify-start text-base"
                onClick={() => {
                  setSelected("Settings");
                }}
              >
                <span className="pr-2">
                  <FaListAlt size="15" />
                </span>
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-base font-semibold tracking-tight">
            Household
          </h2>
          {userRole === "Personal" ? (
            <div className="space-y-1">
              <Link to="/household">
                <Button
                  variant={
                    selected === "HouseholdDashboard" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => {
                    setSelected("HouseholdDashboard");
                  }}
                >
                  <span className="pr-2">
                    <FaHome size="15" />
                  </span>
                  My Household
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              <Link to="/household">
                <Button
                  variant={
                    selected === "HouseholdDashboard" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => {
                    setSelected("HouseholdDashboard");
                  }}
                >
                  <span className="pr-2">
                    <FaHome size="15" />
                  </span>
                  My Household
                </Button>
              </Link>
              <Link to="/household/budget">
                <Button
                  variant={
                    selected === "HouseholdBudget" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => {
                    setSelected("HouseholdBudget");
                  }}
                >
                  <span className="pr-2">
                    <FaMoneyBillWave size="15" />
                  </span>
                  Budget
                </Button>
              </Link>

              <Link to="/household/activity">
                <Button
                  variant={
                    selected === "HouseholdActivity" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => {
                    setSelected("HouseholdActivity");
                  }}
                >
                  <span className="pr-2">
                    <FaListAlt size="15" />
                  </span>
                  Activity
                </Button>
              </Link>
            </div>
          )}
        </div> */}
        <div className="mt-auto mb-12 mx-2">
          <Button
            variant="destructive"
            className="w-full justify-start text-base mb-11 py-6"
          >
            <span className="pr-2">
              <FaListAlt size="15" />
            </span>
            Logout
          </Button>
          <Separator />
          <div className="flex py-4 items-center">
            <span className="mr-2 pr-4">
              <FaUser size="25" />
            </span>
            <div>
              <h2 className="font-semibold">Tushar Agrawal</h2>
              <p className="text-xs">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
