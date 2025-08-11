import { useSelector } from "react-redux"
import type { Message } from "../../model/Message"
import type { RootState } from "../../redux/Store"
import { Typography } from "@mui/material"
import { useThemeContext } from "../../context/ThemeContext"

const ChatMessage = ({message}:{message:Message}) => {
  const {userProfile} = useSelector((state:RootState)=>state.profile)
    const isUser = userProfile?.email == message.user.email
      const { mode } = useThemeContext();
  const receiverTheme = mode === 'light' ? 'bg-gray-100' : 'bg-gray-800';
  const senderTheme = mode === 'light' ? 'bg-[#F5F6EF]' : 'bg-[#2C2F33]';
  return ( 
    <div className={`flex ${isUser ? "justify-start":"justify-end"}  `}>
        <div className={`p-1 ${isUser ? "rounded-md px-2":"rounded-full px-5"} ${isUser ? senderTheme : receiverTheme}`}>
            {message.image && <img className="w-[12rem] h-[17rem] rounded-md object-cover " src={message.image}/> }
            <Typography className={`${isUser?"py-2":"py-1"}`}>{message.content}</Typography>
        </div>
    </div>
  )
}

export default ChatMessage