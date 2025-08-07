import { useState } from "react";

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


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending: isLoading } = useLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Welcome to your admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:shadow-lg"
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline transition-all duration-75 hover:text-primary"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02] focus:shadow-lg"
                  />
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

