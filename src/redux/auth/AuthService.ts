import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";


export const LoginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const {data} = await api.post(`auth/login`, userData);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred during login');
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