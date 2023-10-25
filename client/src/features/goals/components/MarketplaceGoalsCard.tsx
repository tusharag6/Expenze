import React from "react";

interface Goal {
  name: string;
  targetDate: string;
}

interface GoalsProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  goals: Goal;
}

export function GoalsCard({ width, height, goals }: GoalsProps) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md">
        <img
          src="https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmFjYXRpb258ZW58MHx8MHx8fDA%3D"
          alt="goals demo"
          width={width}
          height={height}
          className="aspect-[3/4] object-cover w-[150px] h-[150px]"
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{goals.name}</h3>
        <p className="text-xs text-muted-foreground text-slate-500">
          {goals.targetDate}
        </p>
      </div>
    </div>
  );
}
