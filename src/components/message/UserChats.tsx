import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../../redux/Store"
import UserChatCard from "./UserChatCard";
import type { UUID } from "crypto";
import { getallMessages } from "../../redux/message/MessageService";
import { selectChat,userReceiver } from "../../redux/message/MessageSlice";


const UserChats = () => {
    const { chat } = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>()

    const onMessaging = (chatId: UUID,userID:UUID) => {
        dispatch(selectChat(chatId))
        dispatch(userReceiver(userID))
        dispatch(getallMessages(chatId))
    }


    if (!chat || chat.length === 0) {
        return <span className="text-gray-500 flex h-full justify-between items-center">No user Selected</span>;
    }

    return (
        <div className="space-y-3 ">
            {chat.map((chatUsers) =>
                <UserChatCard key={chatUsers.id} user={chatUsers.users[0]} message={null} onClick={() => onMessaging(chatUsers.id, chatUsers.users[0].id)} />
            )}
        </div>
    );
};

export default UserChats;