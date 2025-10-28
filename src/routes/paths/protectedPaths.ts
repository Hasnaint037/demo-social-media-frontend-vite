export const PROTECTED_PATHS = {
  HOME: "/",
  USERS: {
    SEARCH: "/users/search",
    PROFILE: (userId = ":userId") => `/users/${userId}`,
  },
  POSTS: {
    CREATE: "/posts/create",
    MY_POSTS: "/posts/mine",
  },
};
