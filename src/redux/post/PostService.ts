import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../config/Api";
import type { ApiError } from "../../model/ApiError";
import type { Post } from "../../model/Post";

export const getPosts = createAsyncThunk<Post[], void, { rejectValue: ApiError }>(
    'post/getPosts',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get(`${API_URL}post/all`, {
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
export const createPost = createAsyncThunk<Post, FormData, { rejectValue: ApiError }>(
    'post/createPost',
    async (postData, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(`${API_URL}post/create`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}posts/${postId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
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
export const likePost = createAsyncThunk(
    'post/likePost',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}posts/${postId}/like`, {}, {
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
export const unlikePost = createAsyncThunk(
    'post/unlikePost',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}posts/${postId}/unlike`, {}, {
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