import { createSlice } from "@reduxjs/toolkit";
import type { Reel } from "../../model/Reels";
import { CreateReel, GetAllReels, getUserReels } from "./ReelsService";


type ReelsState = {
    reels: Reel[];
    userReels:Reel[]
    loading: boolean;
    error: string | null;
};


const initialState: ReelsState = {
    reels: [],
    userReels:[],
    loading: false,
    error: null,
};


const ReelsSlice = createSlice({
    name: 'reels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllReels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllReels.fulfilled, (state, action) => {
                state.loading = false;
                state.reels = action.payload;
            })
            .addCase(getUserReels.fulfilled,(state,action)=>{
                state.userReels = action.payload

            })
            .addCase(GetAllReels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message ?? 'Failed to fetch reels';
            })
            .addCase(CreateReel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CreateReel.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(CreateReel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message ?? 'Failed to create reel';
            });
    },
});

export const ReelsReducer = ReelsSlice.reducer;
