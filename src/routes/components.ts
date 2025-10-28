import { lazy } from "react";
const Signup = lazy(() => import("@/screens/auth/signupLogin"));
const Home = lazy(() => import("@/screens/home"));
const ResetPassword = lazy(
  () => import("@/screens/auth/forgotPassword/ResetPassword")
);
const ForgotPassword = lazy(
  () => import("@/screens/auth/forgotPassword/ForgotPassword")
);
const SearchUser = lazy(() => import("@/screens/user/SearchUser"));
const CreatePost = lazy(() => import("@/screens/post/CreatePost"));

export const ROUTE_COMPONENTS = {
  SIGNUP: Signup,
  FORGOT_PASSWORD: ForgotPassword,
  RESET_PASSWORD: ResetPassword,
  HOME: Home,
  SEARCH_USER: SearchUser,
  CREATE_POST: CreatePost,
};
