import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import type { User } from "../../model/User";
import { GetUserProfile, UpdateUserProfile } from "./ProfileService";
import type { ApiError } from "../../model/ApiError";

type ProfileSliceType = {
    userProfile: User | null,
    loading: boolean,
    error: ApiError | null,
};


const initialState: ProfileSliceType = {
    userProfile: null,
    loading: false,
    error: null,
};
const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(UpdateUserProfile.fulfilled, (state, action) => {
                state.userProfile = { ...state.userProfile, ...action.payload };
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
});


export const ProfileReducer = ProfileSlice.reducer;