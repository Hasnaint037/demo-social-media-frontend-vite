import { AUTH_PATHS } from "./src/routes/paths/authPaths";
import { ROUTE_COMPONENTS } from "./src/routes/components";
import { PROTECTED_PATHS } from "./src/routes/paths/protectedPaths";

export const ROUTE_CONFIG = {
  AUTH: [
    { path: AUTH_PATHS.LOGIN, component: ROUTE_COMPONENTS.SIGNUP },
    { path: AUTH_PATHS.SIGNUP, component: ROUTE_COMPONENTS.SIGNUP },
    {
      path: AUTH_PATHS.FORGOT_PASSWORD,
      component: ROUTE_COMPONENTS.FORGOT_PASSWORD,
    },
    {
      path: AUTH_PATHS.RESET_PASSWORD,
      component: ROUTE_COMPONENTS.RESET_PASSWORD,
    },
  ],
  PROTECTED: [
    { path: PROTECTED_PATHS.HOME, component: ROUTE_COMPONENTS.HOME },
    {
      path: PROTECTED_PATHS.SEARCH_USER,
      component: ROUTE_COMPONENTS.SEARCH_USER,
    },
    {
      path: PROTECTED_PATHS.CREATE_POST,
      component: ROUTE_COMPONENTS.CREATE_POST,
    },
  ],
};
