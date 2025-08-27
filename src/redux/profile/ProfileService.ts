import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiError } from "../../model/ApiError";
import api from "../../config/Api";
import type { Profile } from "../../model/Profile";


export const GetUserProfile = createAsyncThunk<Profile, void, { rejectValue: ApiError }>(
    'profile/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`profile/user`);
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

export const updateProfile = createAsyncThunk<Profile, FormData, { rejectValue: ApiError }>(
    'profile/updateProfile',
    async (userData: FormData, { rejectWithValue }) => {
        console.log(userData.get("id"));
        try {
            const { data } = await api.put(`profile/${userData.get("id")}`, userData);
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