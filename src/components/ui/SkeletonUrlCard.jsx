import { Skeleton } from "./skeleton";

const SkeletonUrlCard = () => {
  return (
    <div className="mt-5 grid grid-cols-4 grid-rows-5 gap-4">
      <Skeleton className="h-36 row-span-2 rounded-md p-4" />
      <Skeleton className="row-span-2 rounded-md p-4" />
      <Skeleton className="row-span-2 rounded-md p-4" />
      <Skeleton className="row-span-5 rounded-md p-4" />
      <Skeleton className=" rounded-md col-span-3 row-span-3 row-start-3 p-4" />
    </div>
  );
};

export default SkeletonUrlCard;
