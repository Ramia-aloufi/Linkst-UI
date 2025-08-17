import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";
import type { ApiError } from "../../model/ApiError";
import type { AxiosError } from "axios";

type LoginReq = {
    email: string;
    password: string;
}
type LoginRes = {
    token: string;
    message: string
}

export const LoginUser = createAsyncThunk<LoginRes, LoginReq, { rejectValue: ApiError }>(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.post(`auth/login`, userData);
            return data;
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>;

            // If server sent a structured ApiError, grab it
            if (axiosError.response?.data) {
                return rejectWithValue(axiosError.response.data);
            }

            // Fallback (network error, timeout, etc.)
            return rejectWithValue({
                message: axiosError.message || "Network error",
                error: axiosError.message || "Network error",
            });
        }
    }
)
export const SignupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData: { firstName: string; lastName: string; email: string; password: string; gender: string }, { rejectWithValue }) => {
        try {
            const { data } = await api.post(`auth/signup`, userData)
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred during signup');
        }
    }
);
export const UserProfile = createAsyncThunk(
    'auth/userProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`auth/profile/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred while fetching user profile');
        }
    }
);
export const UpdateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData: { firstName: string; lastName: string; email: string; gender: string }, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`auth/profile`, userData);
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred while updating user profile');
        }
    }
);