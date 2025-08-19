import Router from "@/routes/Router";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { setupTokenValidation } from "@/lib/axios";

const App = () => {
  useEffect(() => {
    // Setup automatic token validation
    const cleanup = setupTokenValidation();

    // Cleanup on unmount
    return cleanup;
  }, []);

  return (
    <>
      <Router />
      <Toaster richColors position="top-right" closeButton={true} />
    </>
  );
};

export default App;
