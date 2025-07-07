import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../config/Api";
import type { User } from "../../model/User";
import type { ApiError } from "../../model/ApiError";


export const GetUserProfile = createAsyncThunk<User,void, { rejectValue: ApiError }>(
    'profile/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = ((await axios.get(`${API_URL}user/profile`,{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }})));
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
            const { data } = await axios.put(`${API_URL}user/profile`, userData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
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
