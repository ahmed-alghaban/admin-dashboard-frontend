import { LandingNavbar } from "./LandingNavbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <LandingNavbar />
      <div
        key={location.pathname}
        className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ease-out"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
