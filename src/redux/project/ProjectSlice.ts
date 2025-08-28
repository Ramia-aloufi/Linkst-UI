import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import type { ApiError } from "../../model/ApiError";
import type { Project } from "../../model/Project";
import { createProject, getUserProjects, deleteProject, getProjectById } from "./ProjectService";





type initialStateType = {
  projects: Project[];
  viewProject: Project | null;
  loading: boolean;
  error: ApiError | null;
};


const initialState: initialStateType = {
  projects: [],
  viewProject: null,
  loading: false,
  error: null,
};

const ProjectSlice = createSlice({
  initialState,
  name: "project",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((project) => project.id !== action.payload.id);
      })
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.viewProject = action.payload;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
                state.error = null;
            })
       .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError | null;
                }
            );
  },
});

export const ProjectReducer = ProjectSlice.reducer;
