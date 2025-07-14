import { Input } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/Store"
import { searchUser } from "../../redux/user/UserService"
import { useEffect, useState } from "react"
import { useDebounce } from "../../hook/UseDebounce"
import UserChatCard from "./UserChatCard"
import type { UUID } from "crypto"
import { CreateChat } from "../../redux/message/MessageService"

const SearchUser = () => {


  const { users, loading } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 700);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchUser(debouncedQuery));
    setQuery("")}
  }, [debouncedQuery, dispatch]);

  const handleStartChat = (id: UUID) => {
    dispatch(CreateChat(id))
  }


  return (
    <div className=" relative bg-white w-full">
      <Input onChange={(e) => setQuery(e.target.value)} fullWidth placeholder="search user..." disabled={loading} />
  <div className="mt-2 absolute z-10 bg-white w-full px-5 space-y-3 overflow-y-scroll max-h-60  rounded ">
        {users && users.map((user) => (
          <UserChatCard user={user} message={null} onClick={() => handleStartChat(user.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchUser