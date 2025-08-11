import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Reel } from "../../model/Reels";
import type { ApiError } from "../../model/ApiError";
import api from "../../config/Api";
import type { AxiosError } from "axios";

export const GetAllReels = createAsyncThunk<Reel[],void, { rejectValue: ApiError }>(
    'reels/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`reels/getAll`);
            return data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const apiError = error.response?.data ?? {
                message: 'Unexpected error',
                error: 'Unknown error',
            };
            return rejectWithValue(apiError);
        }
    }
);

export const CreateReel = createAsyncThunk<void, FormData, { rejectValue: ApiError }>(
    'reels/create',
    async (formData, { rejectWithValue }) => {
        try {
            await api.post(`reels/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const apiError = error.response?.data ?? {
                message: 'Unexpected error',
                error: 'Unknown error',
            };
            return rejectWithValue(apiError);
        }
    }
);