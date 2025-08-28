import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../config/Api";
import type { Project } from "../../model/Project";
import type { ApiError } from "../../model/ApiError";
import type { AxiosError } from "axios";
import type { UUID } from "crypto";

export const createProject = createAsyncThunk<Project, FormData, { rejectValue: ApiError }>(
  "projects/create",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await api.post("/project", projectData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
      return response.data
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const apiError = error.response?.data ?? {
                message: 'Unexpected error',
                error: 'Unknown error',
            };
            return rejectWithValue(apiError);
        }
  }
)

export const getUserProjects = createAsyncThunk<Project[], UUID, { rejectValue: ApiError }>(
  "projects/getUserProjects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/project/user/${userId}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const apiError = error.response?.data ?? {
        message: 'Unexpected error',
        error: 'Unknown error',
      };
      return rejectWithValue(apiError);
    }
  }
)

export const deleteProject = createAsyncThunk<Project, UUID, { rejectValue: ApiError }>(
  "projects/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/project/${projectId}`);
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
)

export const getProjectById = createAsyncThunk<Project, UUID, { rejectValue: ApiError }>(
  "projects/getProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/project/${projectId}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const apiError = error.response?.data ?? {
        message: 'Unexpected error',
        error: 'Unknown error',
      };
      return rejectWithValue(apiError);
    }
  }
)
