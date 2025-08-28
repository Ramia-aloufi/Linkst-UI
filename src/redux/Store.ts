import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/AuthSlice";
import { ProfileReducer } from "./profile/ProfileSlice";
import { PostReducer } from "./post/PostSlice";
import { CommentReducer } from "./comment/CommentSlice";
import { MessageReducer } from "./message/MessageSlice";
import { UserReducer } from "./user/UserSlice";
import { ReelsReducer } from "./reels/ReelsSlice";
import { StoryReducer } from "./story/StorySlice";
import { ProjectReducer } from "./project/ProjectSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    profile: ProfileReducer,
    post: PostReducer,
    comment: CommentReducer,
    message:MessageReducer,
    user:UserReducer,
    reels: ReelsReducer, 
    story: StoryReducer,
    project: ProjectReducer,

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;




