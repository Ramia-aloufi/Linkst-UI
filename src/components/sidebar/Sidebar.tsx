import { Avatar, Card, Divider } from "@mui/material"
import { SidebarMenu } from "./SidebarMenu"
import LogoutIcon from '@mui/icons-material/Logout';
import { type AppDispatch, type RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/linkst1.svg"
import { logOut } from "../../redux/auth/AuthSlice";
const Sidebar = () => {

  const { userProfile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onLogOut = ()=>{
    dispatch(logOut())
    navigate("/login")
  }
  return (
    <Card className="card h-screen flex flex-col justify-between ">
      <div className="space-y-4 pl-5">
        <div className="py-5 flex space-x-2">
          <img src={logo} alt="Logo" width="30" height="30"/>
          <span className="font-bold text-2xl">Linkst</span>
        </div>
        <div className="space-y-4">
          {SidebarMenu.map((item) => (
            <div  onClick={() => {navigate(item.path)}} key={item.name} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <item.icon />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <Divider />
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Avatar sx={{ width: 40, height: 40 }} >
                {userProfile?.firstName.slice(0,2)}
                </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{userProfile?.firstName} {userProfile?.lastName}</span>
                <span className="text-xs text-gray-500">@{userProfile?.firstName.toLocaleLowerCase()}_{userProfile?.lastName.toLocaleLowerCase()}</span>
              </div>
            </div>
            
            <LogoutIcon sx={{ width: 20, height: 20 }} onClick={onLogOut} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar


