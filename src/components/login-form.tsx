import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/form/label";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginInput } from "@/features/auth/authTypes";
import { Lock, Eye, EyeOff, Mail, Shield } from "lucide-react";
import { useState } from "react";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const { mutate: login, isPending: isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await login(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={cn(
                    "pl-10 pr-4 py-3 text-base transition-all duration-300 ease-in-out",
                    "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50",
                    "hover:border-blue-300 dark:hover:border-blue-600",
                    "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.email &&
                      "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400 animate-in fade-in-0 slide-in-from-top-1 duration-200 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={cn(
                    "pl-10 pr-12 py-3 text-base transition-all duration-300 ease-in-out",
                    "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50",
                    "hover:border-blue-300 dark:hover:border-blue-600",
                    "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.password &&
                      "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400 animate-in fade-in-0 slide-in-from-top-1 duration-200 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {isLoading ? (
                <Button
                  type="submit"
                  className="w-full py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out animate-pulse"
                  disabled
                >
                  <span className="inline-flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Sign In
                  </span>
                </Button>
              )}
            </div>

            {/* Security Notice */}
            <div className="text-center pt-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Your data is protected with SSL encryption
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
