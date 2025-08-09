import { Skeleton } from "@/components/ui/skeleton/skeleton";

export const FormSkeleton = ({ fields = 4 }: { fields?: number }) => (
    <div className="space-y-4">
        {[...Array(fields)].map((_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-9 w-full" />
            </div>
        ))}
        <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
        </div>
    </div>
);