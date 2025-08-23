import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";
import type { User } from "../userTypes";

interface UserStatsCardsProps {
  users: User[];
}

const UserStatsCards = ({ users }: UserStatsCardsProps) => {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;
  const newThisMonth = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    const now = new Date();
    return (
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Users
          </CardTitle>
          <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {totalUsers}
          </div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Active Users
          </CardTitle>
          <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {activeUsers}
          </div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Inactive Users
          </CardTitle>
          <UserX className="h-4 w-4 text-red-600 dark:text-red-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {inactiveUsers}
          </div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            New This Month
          </CardTitle>
          <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {newThisMonth}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
