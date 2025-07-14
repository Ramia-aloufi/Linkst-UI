import { Avatar, Grid, IconButton, Input } from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from "./SearchUser";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { useEffect, useState, type ChangeEvent } from "react";
import { createMessage, getAllChat } from "../../redux/message/MessageService";
import UserChats from "./UserChats";
import { GetUserProfile } from "../../redux/profile/ProfileService";
const Message = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { messages, selectedChatID } = useSelector((state: RootState) => state.message)
    const [msg, setMsg] = useState<{ content: string, img: File | null }>({ content: "", img: null })
    const sendMsg = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key == "Enter") {
            const data = new FormData
            if(msg.content.length >0 )
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

    return (
        <Grid container className={"h-screen overflow-y-hidden"}>
            <Grid size={3}>
                <div className="flex h-full justify-between space-x-2">
                    <div className="w-full">
                        <div className="flex item-center space-x-4 py-5">
                            <KeyboardArrowLeftIcon />
                            <h1 className="text-xl font-bold">Home</h1>
                        </div>
                        <div className="h-[83vh] px-5">
                            <div className="">
                                <SearchUser />

                            </div>
                            <div className="h-full  overflow-y-scroll hideScrollBar ">
                                <UserChats />
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid size={9} >
                <div className="">
                    <div className="flex justify-between items-center border-l p-5">
                        <div className="flex items-center space-x-3">
                            <Avatar />
                            <span>Code c</span>
                        </div>
                        <div className="">
                            <IconButton>
                                <CallIcon />
                            </IconButton>
                            <IconButton>
                                <VideoCallIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="hideScrollBar overflow-y-scroll h-[82vh] px-2 space-y-5 py-4">
                        {messages.map((msg) => (
                            <ChatMessage message={msg} />
                        ))}
                    </div>
                </div>
                <div className="sticky bottom-0 border-l px-4">
                    <div className="flex justify-center items-center space-x-5 py-5">
                        {msg.img && <img src={URL.createObjectURL(msg.img)} className=" absolute w-[100px] h-[200px] rounded-md left-2 bottom-20 "/>}
                        <Input fullWidth value={msg.content} onChange={(e) => setMsg(prev => ({ ...prev, content: e.target.value }))} onKeyDown={sendMsg} />
                        <div className="">
                            <input type="file" accept="image/*" className="hidden" id="upload_img" onChange={uploadImg} />
                            <label htmlFor="upload_img"><AddPhotoAlternateIcon /></label>
                        </div>

                    </div>

                </div>
            </Grid>
        </Grid>

    )
}

export default Message