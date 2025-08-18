import { Avatar, Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from "./SearchUser";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { createMessage, getAllChat } from "../../redux/message/MessageService";
import UserChats from "./UserChats";
import { GetUserProfile } from "../../redux/profile/ProfileService";
import { connectWebSocket, disconnectWebSocket } from "../../config/connectWebSocket";
import { addNewMessage } from "../../redux/message/MessageSlice";
const Message = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { messages, selectedChatID } = useSelector((state: RootState) => state.message)
    const [msg, setMsg] = useState<{ content: string, img: File | null }>({ content: "", img: null })
    const sendMsg = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == "Enter") {
            const data = new FormData
            if (msg.content.length > 0)
                data.append("content", msg.content)
            if (msg.img) {
                data.append("image", msg.img)
            }
            if (selectedChatID)
                dispatch(createMessage({ chatID: selectedChatID, msg: data }))
            setMsg({ content: "", img: null })

        }
    }
    const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setMsg(prev => ({ ...prev, img: file }))
    }

    useEffect(() => {
        dispatch(getAllChat());
        dispatch(GetUserProfile())
    }, [dispatch]);

    useEffect(() => {
        if (selectedChatID)
            connectWebSocket(selectedChatID.toString(), (msg) => {
                dispatch(addNewMessage(msg));
            });

        return () => {
            disconnectWebSocket();
        };
    }, [selectedChatID, dispatch]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current)
            bottomRef.current.scrollTop = bottomRef.current?.scrollHeight
    }, [messages]);


    return (
            <Grid container spacing={4} className={"h-[85vh] overflow-y-hidden"}>
                {/* {Left Sidebar} */}
                <Grid size={3}>
                    <Card variant="outlined" className="flex p-2 justify-between space-x-2">
                        <div className="w-full">
                            <Typography className="py-2 pl-5" variant="h6">Messages</Typography>
                            <Box className="h-[85vh] px-5">
                                <SearchUser />
                                <UserChats />
                            </Box>
                        </div>
                    </Card>
                </Grid>
                {/* {Right Sidebar} */}
                <Grid size={9} >
                    {selectedChatID ? (
                    <div className="flex flex-col h-full space-y-3">
                        <Card variant="outlined" className=" flex justify-between items-center border-l p-5 ">
                            <div className="flex items-center space-x-3">
                                <Avatar />
                                <span>Code c</span>
                            </div>
                            <div className="">
                                <Typography color="primary" variant="body2">Show Profile</Typography>
                            </div>
                        </Card>
                        <Card variant="outlined">
                        <div  ref={bottomRef} className=" h-[60vh] hideScrollBar overflow-y-auto  px-5 space-y-5 py-4 ">
                            {messages.map((msg, index) => (
                                <ChatMessage key={index} message={msg} />
                            ))}
                        </div>
                        <div className=" flex-1 border-l p-4 flex justify-center items-center space-x-5 py-5 ">
                            {msg.img && <img src={URL.createObjectURL(msg.img)} className=" absolute w-[100px] h-[200px] rounded-md right-8 bottom-20 " />}
                            <TextField variant="standard" placeholder="Type a message..." fullWidth value={msg.content} onChange={(e) => setMsg(prev => ({ ...prev, content: e.target.value }))} onKeyUp={sendMsg} />
                            <div className="">
                                <input type="file" accept="image/*" className="hidden" id="upload_img" onChange={uploadImg} />
                                <label htmlFor="upload_img"><AddPhotoAlternateIcon /></label>
                            </div>
                        </div>
                        </Card>
                    </div>                    ) : (
                        <Card className=" flex flex-col  justify-center items-center bg-red-400 h-[85vh]">
                        <Typography variant="body1" className="text-center mb-20 flex">Select a chat to start messaging</Typography>
                        <Box className="flex justify-center items-center mt-4">
                            <Button variant="contained" color="primary">Start Chat</Button>
                        </Box>
                        </Card>
                    )}
                </Grid>
            </Grid>
    )
}

export default Message