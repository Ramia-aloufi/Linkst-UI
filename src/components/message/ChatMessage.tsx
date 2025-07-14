import { useSelector } from "react-redux"
import type { Message } from "../../model/Message"
import type { RootState } from "../../redux/Store"

const ChatMessage = ({message}:{message:Message}) => {
  const {userProfile} = useSelector((state:RootState)=>state.profile)
    const isUser = userProfile?.email == message.user.email
  return ( 
    <div className={`flex ${isUser ? "justify-start":"justify-end"} text-white `}>
        <div className={`p-1 ${isUser ? "rounded-md":"rounded-full px-5"} bg-[#191c29]`}>
            {message.image && <img className="w-[12rem] h-[17rem] rounded-md object-cover " src={message.image}/> }
            <p className={`${isUser?"py-2":"py-1"}`}>{message.content}</p>
        </div>
    </div>
  )
}

export default ChatMessage