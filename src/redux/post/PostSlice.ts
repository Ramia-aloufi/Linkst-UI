import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Post } from "../../model/Post";
import { createPost, getPosts, likePost } from "./PostService";
import type { ApiError } from "../../model/ApiError";

type PostInitialState = {
    posts: Post[];
    loading: boolean;
    error: ApiError | null;
};

const initialState: PostInitialState = {
    posts: [],
    loading: false,
    error: null,
};
const PostSelector = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index].likedByCurrentUser = action.payload.likedByCurrentUser;
                    state.posts[index].likeCount = action.payload.likeCount;
                }
            })

            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError | null;
                }
            );
    }
})
export const PostReducer = PostSelector.reducer;