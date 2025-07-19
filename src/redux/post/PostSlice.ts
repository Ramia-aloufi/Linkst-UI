import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Post } from "../../model/Post";
import { createPost, getPosts, likePost } from "./PostService";
import type { ApiError } from "../../model/ApiError";

type PostInitialState = {
    posts: Post[];
    currentPage: number,
    totalPages: number,
    totalItems: number,
    hasNext: boolean,
    hasPrevious: boolean,
    loading: boolean;
    error: ApiError | null;
    page: number
};

const initialState: PostInitialState = {
    posts: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    hasNext: false,
    hasPrevious: false,
    page: 0,
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
                state.posts = [...state.posts, ...action.payload.content]
                state.currentPage = action.payload.currentPage;
                state.hasNext = action.payload.hasNext;
                state.hasPrevious = action.payload.hasPrevious
                state.page = action.payload.currentPage + 1
                console.log(state.posts.length);

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