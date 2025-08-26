import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";
import type { AxiosError } from "axios";
import type { ApiError } from "../../model/ApiError";
import type { PostComment } from "../../model/Comment";
import type { UUID } from "crypto";


export const createComments = createAsyncThunk<PostComment, { postId: string, comment: string },{ rejectValue: ApiError }>(`comments/create`, async ({ postId, comment },{ rejectWithValue }) => {
    try {
        const {data} = await api.post(`/comment/create/post/${postId}`, {comment}  );
        return data;
    } catch (err) {
            const error = err as AxiosError<ApiError>;
            const apiError = error.response?.data ?? {
                message: 'Unexpected error',
                error: 'Unknown error',
            };
            return rejectWithValue(apiError);
    }
});

export const getComments = createAsyncThunk<PostComment[], string, { rejectValue: ApiError }>(`comments/get`, async (postId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/comment/post/${postId}`);
        return data;
    } catch (err) {
        const error = err as AxiosError<ApiError>;
        const apiError = error.response?.data ?? {
            message: 'Unexpected error',
            error: 'Unknown error',
        };
        return rejectWithValue(apiError);
    }
});
export const deleteComment = createAsyncThunk<string, UUID, { rejectValue: ApiError }>(
    'comment/delete',
    async (reelsId, { rejectWithValue }) => {
        try {
           const {data} =  await api.delete(`comment/delete/${reelsId}`);
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


