import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../model/User";
import type { ApiError } from "../../model/ApiError";
import api from "../../config/Api";
import type { AxiosError } from "axios";

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