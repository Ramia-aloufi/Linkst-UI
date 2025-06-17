import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/Api";
export const LoginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${API_URL}auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response.data;
        }
        } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'An error occurred during login');
        }
    }
)
export const SignupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData: { firstName: string; lastName: string; email: string; password: string; gender: string }, { rejectWithValue }) => {
        try {
            const {data} = await axios.post(`${API_URL}auth/signup`, userData)
                return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred during signup');
        }
    }
);