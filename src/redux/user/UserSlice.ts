import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import type { ApiError } from "../../model/ApiError"
import type { User } from "../../model/User"
import { searchUser } from "./UserService"

type InitialStateType = {
    users:User[]
    loading:boolean
    error:ApiError|null
}


const initialState:InitialStateType = {
    users:[],
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(searchUser.fulfilled,(state,action)=>{
            state.users = action.payload
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
})


export const UserReducer = userSlice.reducer