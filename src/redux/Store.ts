import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/AuthSlice";
import { ProfileReducer } from "./profile/ProfileSlice";
import { PostReducer } from "./post/PostSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    profile: ProfileReducer,
    post: PostReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


