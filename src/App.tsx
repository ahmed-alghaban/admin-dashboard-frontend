import Router from "@/routes/Router";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Router />
      <Toaster richColors position="top-right" closeButton={true} />
    </>
  );
};

export default App;
