import { CardSkeleton } from "./CardSkeleton";

export const SkeletonStatsRow: React.FC = () => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
        {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} lines={2} />
        ))}
    </div>
);