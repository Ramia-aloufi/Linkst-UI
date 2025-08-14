import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { GetUserProfile, updateProfile } from "./ProfileService";
import type { ApiError } from "../../model/ApiError";
import type { Profile } from "../../model/Profile";

type ProfileSliceType = {
    userProfile: Profile | null,
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
            .addCase(updateProfile.fulfilled, (state, action) => {
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