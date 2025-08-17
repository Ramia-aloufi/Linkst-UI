import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { LoginUser, SignupUser } from "./AuthService";
import type { ApiError } from "../../model/ApiError";


type AuthTypes = {
    token: string | null;
    loading: boolean;
    error: ApiError | null,
};

const initialState: AuthTypes = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut:(state)=>{
            state.token = null
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token);
                state.token = action.payload.token;
            })
            .addCase(SignupUser.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token);
                state.token = action.payload.token;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                    state.error = null;
                                }
            )
            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError | null;
                }
            );
    }
});
export const{logOut}= AuthSlice.actions

export const AuthReducer = AuthSlice.reducer;