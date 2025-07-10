import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../config/Api";
import type { ApiError } from "../../model/ApiError";
import type { Post } from "../../model/Post";

export const getPosts = createAsyncThunk<Post[], void, { rejectValue: ApiError }>(
    'post/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`post/summaries`);
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
export const createPost = createAsyncThunk<Post, FormData, { rejectValue: ApiError }>(
    'post/createPost',
    async (postData, { rejectWithValue }) => {
        try {

            const { data } = await api.post(`post/create`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            await api.delete(`posts/${postId}`);
            return postId;
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
export const likePost = createAsyncThunk<Post, string>(
    'post/likePost',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await api.get<Post>(`post/like/${postId}`);
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
export const unlikePost = createAsyncThunk(
    'post/unlikePost',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await api.post(`posts/${postId}/unlike`);
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