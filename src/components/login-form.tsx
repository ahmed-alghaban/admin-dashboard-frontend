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

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>();
  const { mutate: login, isPending: isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await login(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-sm sm:text-base">Welcome to your admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-4 sm:gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required"
                    })}
                    className={cn(
                      "transition-all duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:shadow-lg text-sm sm:text-base",
                      errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs sm:text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                    <a
                      href="#"
                      className="text-xs sm:text-sm underline-offset-4 hover:underline transition-all duration-75 hover:text-primary self-start sm:self-auto"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={cn(
                      "transition-all duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:shadow-lg text-sm sm:text-base",
                      errors.password && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.password && (
                    <p className="text-xs sm:text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  {isLoading ? (
                    <Button
                      type="submit"
                      className="w-full transition-all duration-300 ease-in-out animate-pulse text-sm sm:text-base"
                      disabled
                    >
                      <span className="inline-flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Logging in...
                      </span>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] text-sm sm:text-base"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

