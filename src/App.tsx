import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </div>
  );
};

export default App;
