import { Skeleton } from "@/components/ui/skeleton/skeleton";

export const CardSkeleton = ({ lines = 3 }: { lines?: number }) => (
    <div className="rounded-2xl border p-4">
        <div className="mb-3 flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        {[...Array(lines)].map((_, i) => (
            <Skeleton key={i} className="mb-2 h-4 w-3/4" />
        ))}
    </div>
);