import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";
import type { UUID } from "crypto";
import type { ApiError } from "../../model/ApiError";
import type { AxiosError } from "axios";
import type { Chat } from "../../model/Chat";
import type { Message } from "../../model/Message";
type CreateMessageArgs = {
    chatID: UUID;
    msg: FormData;
};

export const CreateChat = createAsyncThunk<Chat, UUID, { rejectValue: ApiError }>("chat/create", async (userId: UUID, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/chat/create", { userId: userId })
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

export const getAllChat = createAsyncThunk<Chat[], void, { rejectValue: ApiError }>("chat/all", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("chat/all")
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

export const createMessage = createAsyncThunk<Message, CreateMessageArgs, { rejectValue: ApiError }>("chat/message/create", async ({ chatID, msg }, { rejectWithValue }) => {
    try {

        const { data } = await api.post(`/message/chat/${chatID}`, msg, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
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

export const getallMessages = createAsyncThunk<Message[], UUID, { rejectValue: ApiError }>("chat/message/all", async (chatId: UUID, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`message/chat/${chatId}`)
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