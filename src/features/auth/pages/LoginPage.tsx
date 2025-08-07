import { LandingNavbar } from "@/components/shared/LandingNavbar";
import { LoginForm } from "@/components/ui/login-form";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

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
      <LandingNavbar />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
