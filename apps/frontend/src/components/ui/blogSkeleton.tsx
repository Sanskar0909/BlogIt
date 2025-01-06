import { Skeleton } from "./skeleton";

export function BlogSkeleton(){
    return (
        <div className="flex flex-col space-y-3 mb-5">
            <Skeleton className="h-4 w-[500px]" />
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[400px]" />
            <div className="space-y-2">
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[350px]" />
          </div>
        </div>
      )
}