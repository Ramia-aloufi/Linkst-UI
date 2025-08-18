import type { Story } from "../../model/Story";
import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { createStory, fetchStories } from "./StoryService";
import type { ApiError } from "../../model/ApiError";



type initialState = {
    stories: Story[];
    loading: boolean;
    error: ApiError | null;
};


const initialState: initialState = {
    stories: [],
    loading: false,
    error: null,
};

export const StorySlice = createSlice({
    name: "story",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStory.fulfilled, (state, action) => {
                state.loading = false;
                state.stories.push(action.payload);
            })
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.loading = false;
                state.stories = action.payload;
            })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError | null;
                }
            );
    },
});


