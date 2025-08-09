import { LoginForm } from "@/components/login-form";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to your admin dashboard" />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons/icons/lock.svg"
        />
      </Helmet>
      <div className="bg-muted flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
