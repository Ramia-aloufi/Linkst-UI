import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import type { ApiError } from "../../model/ApiError";
import { createComments, getComments } from "./CommentService";
import type { PostComment } from "../../model/Comment";




type CommentState = {
  comments: PostComment[];
  loading: boolean;
  error: ApiError | null;
};
const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComments.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
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
});

export const CommentReducer = CommentSlice.reducer;
