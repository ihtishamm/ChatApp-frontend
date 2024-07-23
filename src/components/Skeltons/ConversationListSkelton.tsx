import { Skeleton } from "@/components/ui/skeleton";

export const ConversationListSkeleton = ({number}: {number: number}) => {
  const skeletonItems = Array(number).fill(0);

  return (
    <div>
      {skeletonItems.map((_, index) => (
        <div key={index} className="w-full relative flex items-center space-x-4 rounded-lg p-4 overflow-y-auto">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
