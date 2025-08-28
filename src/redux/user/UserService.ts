import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User, UserInfo } from "../../model/User";
import type { ApiError } from "../../model/ApiError";
import api from "../../config/Api";
import type { AxiosError } from "axios";
import type { UserStory } from "../../model/UsersStory";
import type { UUID } from "crypto";

export const searchUser = createAsyncThunk<User[], string,{ rejectValue: ApiError }>("user/search", async (query, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`user/search?query=${encodeURIComponent(query)}`)
        return data

    } catch (err) {
        const error = err as AxiosError<ApiError>;
        const apiError = error.response?.data ?? {
            message: 'Unexpected error',
            error: 'Unknown error',
        };
        return rejectWithValue(apiError);

    }

})
export const getUserById = createAsyncThunk<UserInfo, string, { rejectValue: ApiError }>(
    "user/getById",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`user/${userId}`);
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
export const getMe = createAsyncThunk<UserInfo, void, { rejectValue: ApiError }>(
    "user/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("user/profile");
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
export const getUsersStory = createAsyncThunk<UserStory[], void, { rejectValue: ApiError }>(
    "user/getUsersStory",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`user/latest-stories`);
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
export const updateUser = createAsyncThunk<UserInfo, FormData, { rejectValue: ApiError }>(
    "user/update",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.put("user", userData);
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
export const getUserByFullName = createAsyncThunk<UserInfo, string, { rejectValue: ApiError }>(
    "user/getByFullName",
    async (fullName, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`user/fullname/${encodeURIComponent(fullName)}`);
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
export const followUser  = createAsyncThunk<UserInfo,UUID,{rejectValue:ApiError}>("user/follow",async(userID,{rejectWithValue})=>{
    try {
        const {data} = await api.put(`user/follow/${userID}`)
        return data
        
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const apiError = error.response?.data ?? {
                message: 'Unexpected error',
                error: 'Unknown error',
            };
            return rejectWithValue(apiError);
        }
})
export const getSomeUsers = createAsyncThunk<UserInfo[], void, { rejectValue: ApiError }>(
    "user/getSomeUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("user/search?query=");
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