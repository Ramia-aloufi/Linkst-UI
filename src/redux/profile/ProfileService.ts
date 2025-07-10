import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { User } from "../../model/User";
import type { ApiError } from "../../model/ApiError";
import api from "../../config/Api";


export const GetUserProfile = createAsyncThunk<User,void, { rejectValue: ApiError }>(
    'profile/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`user/profile`);
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

export const UpdateUserProfile = createAsyncThunk<User, User, { rejectValue: ApiError }>(
    'profile/updateUserProfile',
    async (userData: User, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`user/profile`, userData);
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
