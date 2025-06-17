import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, SignupUser } from "./AuthService";


type AuthTypes = {
    token: string | null;
    loading: boolean;
    error: string | null;
};


const initialState: AuthTypes = {
    token: null,
    loading: false,
    error: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.token = action.payload;
            })
            .addCase(SignupUser.fulfilled, (state, action) => {
                state.token = action.payload;
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
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string | null;
                }
            );
    }
});

export const AuthReducer = AuthSlice.reducer;