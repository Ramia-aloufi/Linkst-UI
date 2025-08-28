import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import type { ApiError } from "../../model/ApiError"
import type { User, UserInfo } from "../../model/User"
import { followUser, getMe, getSomeUsers, getUserByFullName, getUserById, getUsersStory, searchUser, updateUser } from "./UserService"
import type { UserStory } from "../../model/UsersStory"

type InitialStateType = {
    searchUsers: User[]
    me: UserInfo | null
    user: UserInfo | null
    usersStories: UserStory[] | null
    loading: boolean
    error: ApiError | null
    someUsers: UserInfo[] | null
}


const initialState: InitialStateType = {
    searchUsers: [],
    me: null,
    user: null,
    usersStories: null,
    loading: false,
    error: null,
    someUsers: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchUser.fulfilled, (state, action) => {
                state.searchUsers = action.payload
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(getUsersStory.fulfilled, (state, action) => {
                state.usersStories = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.me= action.payload
            })
            .addCase(getUserByFullName.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(followUser.fulfilled,(state,action)=>{
                state.me = action.payload

            })
            .addCase(getSomeUsers.fulfilled, (state, action) => {
                    state.someUsers = action.payload.filter(user => user.id !== state.me?.id).reverse().slice(0, 5);
                
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