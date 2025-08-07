import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginInput } from "@/features/auth/authTypes";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>();
  const { mutate: login, isPending: isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await login(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Welcome to your admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required"
                    })}
                    className={cn(
                      "transition-all duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:shadow-lg",
                      errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm underline-offset-4 hover:underline transition-all duration-75 hover:text-primary"
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
                      "transition-all duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:shadow-lg",
                      errors.password && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  {isLoading ? (
                    <Button
                      type="submit"
                      className="w-full transition-all duration-300 ease-in-out animate-pulse"
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
                      className="w-full transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
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

