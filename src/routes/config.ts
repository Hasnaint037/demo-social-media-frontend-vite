import { AUTH_PATHS } from "./paths/authPaths";
import { ROUTE_COMPONENTS } from "../screens/components";
import { PROTECTED_PATHS } from "./paths/protectedPaths";

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
      path: PROTECTED_PATHS.USERS.SEARCH,
      component: ROUTE_COMPONENTS.SEARCH_USER,
    },
    {
      path: PROTECTED_PATHS.POSTS.CREATE,
      component: ROUTE_COMPONENTS.CREATE_POST,
    },
    {
      path: PROTECTED_PATHS.POSTS.MY_POSTS,
      component: ROUTE_COMPONENTS.MY_POSTS,
    },
    {
      path: PROTECTED_PATHS.USERS.PROFILE,
      component: ROUTE_COMPONENTS.USER_DEATIL,
    },
  ],
};
