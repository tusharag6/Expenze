import { useState } from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMoneyBillWave,
  FaListAlt,
  FaQuestionCircle,
  FaLock,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <div className={cn("pb-12 h-[100vh]", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Link to="/">
              <Button
                variant={selected === "Dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelected("Dashboard");
                }}
              >
                <span className="pr-2">
                  <FaHome size="15" />
                </span>
                Dashboard
              </Button>
            </Link>
            <Link to="/budget">
              <Button
                variant={selected === "Budget" ? "secondary" : "ghost"}
                className="w-full justify-start"
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

            <Link to="/activity">
              <Button
                variant={selected === "Activity" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelected("Activity");
                }}
              >
                <span className="pr-2">
                  <FaListAlt size="15" />
                </span>
                Activity
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Others
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <span className="pr-2">
                <FaQuestionCircle size="15" />
              </span>
              Support
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="pr-2">
                <FaLock size="15" />
              </span>
              Privacy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="pr-2">
                <FaInfoCircle size="15" />
              </span>
              About Us
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="pr-2">
                <FaPhoneAlt size="15" />
              </span>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
