import { LoginForm } from "@/components/login-form";
import { Helmet } from "react-helmet";
import { Shield, Users, BarChart3, Package, ShoppingCart } from "lucide-react";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - Admin Dashboard</title>
        <meta name="description" content="Login to your admin dashboard" />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons/icons/lock.svg"
        />
      </Helmet>

      {/* Beautiful gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Header section */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Secure access to your management console
            </p>
          </div>

          {/* Login form container */}
          <div className="w-full max-w-md">
            <LoginForm />
          </div>

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                User Management
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Product Control
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
              <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Order Tracking
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
              <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Analytics
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
