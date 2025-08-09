import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsCardProps } from "@/lib/types";

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    trend,
    className,
}) => {
    const isUp = trend && trend.value >= 0;

    return (
        <Card className={cn("rounded-2xl", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold tracking-tight">
                    {typeof value === "number" ? value.toLocaleString() : value}
                </div>

                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}

                {trend && (
                    <div className="mt-3 inline-flex items-center gap-2 text-xs">
                        <span
                            className={cn(
                                "inline-flex items-center font-medium",
                                isUp ? "text-emerald-600" : "text-rose-600"
                            )}
                        >
                            {isUp ? "▲" : "▼"} {Math.abs(trend.value)}%
                        </span>
                        {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
