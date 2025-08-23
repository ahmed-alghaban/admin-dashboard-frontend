import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Activity, Clock, Users, Globe } from "lucide-react";
import type { AuditLog } from "../auditLogTypes";

interface AuditLogStatsCardsProps {
  auditLogs: AuditLog[];
}

const AuditLogStatsCards = ({ auditLogs }: AuditLogStatsCardsProps) => {
  const totalLogs = auditLogs.length;

  // Get unique users
  const uniqueUsers = new Set(auditLogs.map((log) => log.userId)).size;

  // Get unique IP addresses
  const uniqueIPs = new Set(auditLogs.map((log) => log.ipAddress)).size;

  // Get today's logs
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLogs = auditLogs.filter((log) => {
    const logDate = new Date(log.timestamp);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  }).length;

  const stats = [
    {
      title: "Total Audit Logs",
      value: totalLogs,
      icon: Activity,
      className: "text-blue-600",
    },
    {
      title: "Unique Users",
      value: uniqueUsers,
      icon: Users,
      className: "text-green-600",
    },
    {
      title: "Unique IP Addresses",
      value: uniqueIPs,
      icon: Globe,
      className: "text-purple-600",
    },
    {
      title: "Today's Logs",
      value: todayLogs,
      icon: Clock,
      className: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.className}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stat.title === "Total Audit Logs"
                  ? "All audit log entries"
                  : stat.title === "Today's Logs"
                    ? "Logs from today"
                    : "Based on current data"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AuditLogStatsCards;
