import { Skeleton } from "@/components/ui/skeleton/skeleton";

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 6, cols = 5 }) => (
    <div className="rounded-2xl border">
        <div className="border-b p-3">
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="p-3">
            {[...Array(rows)].map((_, r) => (
                <div key={r} className="grid grid-cols-12 gap-3 py-2">
                    {[...Array(cols)].map((_, c) => (
                        <Skeleton key={c} className="col-span-12 h-4 sm:col-span-2" />
                    ))}
                </div>
            ))}
        </div>
    </div>
);