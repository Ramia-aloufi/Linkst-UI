import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Story } from "../../model/Story";
import api from "../../config/Api";
import type { ApiError } from "../../model/ApiError";
import type { AxiosError } from "axios";

export const createStory = createAsyncThunk<Story, Story, { rejectValue: ApiError }>(
  "stories/create",
  async (storyData, { rejectWithValue }) => {

    try {
        const { data } = await api.post("story/create", storyData,{
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


export const fetchStories = createAsyncThunk<Story[], void, { rejectValue: ApiError }>(
  "stories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("story/user");
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