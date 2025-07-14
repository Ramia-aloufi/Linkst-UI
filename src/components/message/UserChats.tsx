import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../../redux/Store"
import UserChatCard from "./UserChatCard";
import type { UUID } from "crypto";
import { getallMessages } from "../../redux/message/MessageService";
import { selectChat } from "../../redux/message/MessageSlice";
const UserChats = () => {
    const { chat } = useSelector((state: RootState) => state.message);
    //   const {userProfile} =  useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>()

    const onMessaging = (chatId:UUID)=>{
        dispatch(selectChat(chatId))
       dispatch(getallMessages(chatId))
    }

    if (!chat || chat.length === 0) {
        return <span>Start chatting</span>;

    }



    return (
        <div className="space-y-3 ">
            {chat.map((chatUsers) =>
                <UserChatCard key={chatUsers.id} user={chatUsers.users[1]} message={null} onClick={()=>onMessaging(chatUsers.id)} />
            )}
        </div>
    );
};

export default UserChats;