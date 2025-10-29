import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTE_CONFIG } from "./config.ts";
import NotFound from "@/components/common/NotFound.tsx";
import ProtectedRoute from "./ProtectedRoute";
import LoadingFallback from "@/components/common/LoadingFallback.tsx";
import ProtectedLayout from "@/layout/index.tsx";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            {ROUTE_CONFIG.PROTECTED.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Route>

        <Route>
          {ROUTE_CONFIG.AUTH.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>

        <Route path=" *" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
