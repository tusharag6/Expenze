import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { FaThList } from "react-icons/fa";
import { Button } from "../../../../components/ui/button";

interface Goal {
  name: string;
  amount: number;
}

interface GoalsProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  goals: Goal;
}

export function GoalsCard({ width, height, goals }: GoalsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border border-border rounded-md flex w-auto p-4 items-center justify-between gap-12 py-6">
          <div className="flex items-center gap-4">
            <span className="border border-border p-2 rounded-sm bg-muted">
              <FaThList size="20" />
            </span>
            <div>
              <div className="text-muted-foreground font-light">
                {goals.name}
              </div>
              <div className="font-bold text-xl">${goals.amount}</div>
            </div>
          </div>
          <div>
            <Button variant={"outline"}>Add</Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
