import { lazy } from "react";
const Signup = lazy(() => import("@/pages/auth/signupLogin"));
const Home = lazy(() => import("@/pages/home"));
const ResetPassword = lazy(() => import("@/pages/auth/resetPassword.tsx"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgotPassword"));
const SearchUser = lazy(() => import("@/pages/user/SearchUser"));
const CreatePost = lazy(() => import("@/pages/post/CreatePost"));
const MyPosts = lazy(() => import("@/pages/user/MyPosts"));
const UserDetail = lazy(() => import("@/pages/user/UserDetail"));

export const ROUTE_COMPONENTS = {
  SIGNUP: Signup,
  FORGOT_PASSWORD: ForgotPassword,
  RESET_PASSWORD: ResetPassword,
  HOME: Home,
  SEARCH_USER: SearchUser,
  CREATE_POST: CreatePost,
  MY_POSTS: MyPosts,
  USER_DEATIL: UserDetail,
};
