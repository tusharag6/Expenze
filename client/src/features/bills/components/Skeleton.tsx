import { Skeleton } from "../../../../components/ui/skeleton";

export function SkeletonBills() {
  return (
    <div className="mt-4 space-y-2">
      <div className="grid grid-flow-col gap-6 grid-cols-12">
        <div className="col-span-1 flex items-center mr-4">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="col-span-2 flex items-center pl-8">
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="col-span-5 pr-24 pl-12">
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="col-span-3 flex items-center pl-14">
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="grid grid-flow-col gap-6 grid-cols-12">
        <div className="col-span-1 flex items-center mr-4">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="col-span-2 flex items-center pl-8">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="col-span-5 pr-24 pl-12">
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="col-span-3 flex items-center pl-14">
          <Skeleton className="h-4 w-52" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
