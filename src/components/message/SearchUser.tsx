import { Card, MenuItem, MenuList, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/Store"
import { searchUser } from "../../redux/user/UserService"
import { useEffect, useState } from "react"
import { useDebounce } from "../../hook/UseDebounce"
import type { UUID } from "crypto"
import { CreateChat } from "../../redux/message/MessageService"

const SearchUser = () => {


  const { searchUsers } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 700);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchUser(debouncedQuery));
      setQuery("")
    }
  }, [debouncedQuery, dispatch]);

  const handleStartChat = (id: UUID) => {
    dispatch(CreateChat(id))
  }


  return (
    <div className=" relative  w-full">
      <TextField onChange={(e) => setQuery(e.target.value)} fullWidth placeholder="search user..." />
      <Card className="mt-2 absolute z-10  w-full px-5 space-y-3 overflow-y-scroll max-h-60 rounded ">
        {searchUsers && searchUsers.map((user) => (
          <MenuList>
            <MenuItem key={user.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-200"
            onClick={() => handleStartChat(user.id)}>
              <Typography className="text-sm">{user.firstName} {user.lastName}</Typography>
          </MenuItem>
          </MenuList>
        ))}
      </Card>
    </div>
  )
}

export default SearchUser