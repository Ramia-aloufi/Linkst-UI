import { createSlice, isRejectedWithValue, type PayloadAction } from "@reduxjs/toolkit"
import type { ApiError } from "../../model/ApiError"
import type { Chat } from "../../model/Chat"
import type { Message } from "../../model/Message"
import { CreateChat, createMessage, getAllChat, getallMessages } from "./MessageService"
import type { UUID } from "crypto"

type postInitialState = {
    chat: Chat[]
    messages: Message[]
    message: Message | null
    loading: boolean
    error: ApiError | null
    selectedChatID:UUID | null
    chatWithUserID: UUID | null
}

const initialState: postInitialState = {
    chat: [],
    messages: [],
    selectedChatID:null,
    chatWithUserID: null,
    message: null,
    loading: false,
    error: null
}

const MessageSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        selectChat:(state,action:PayloadAction<UUID>)=>{
            state.selectedChatID = action.payload
        },
        userReceiver:(state,action:PayloadAction<UUID>)=>{
            state.chatWithUserID = action.payload
        },
        addNewMessage:(state,action:PayloadAction<Message>)=>{   
           state.messages.push(action.payload);

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateChat.fulfilled, (state, action) => {
                state.chat.push(action.payload)
            })
            .addCase(getAllChat.fulfilled, (state, action) => {
                state.chat = action.payload
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload)
            })
            .addCase(getallMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true
                    state.error = null
                })
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state) => {
                    state.loading = false
                    state.error = null
                })
            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as ApiError | null;
                }
            );
    }
})



export const MessageReducer = MessageSlice.reducer
export const {selectChat,addNewMessage,userReceiver} = MessageSlice.actions