import { Avatar, Card, Divider } from "@mui/material"
import { SidebarMenu } from "./SidebarMenu"
import LogoutIcon from '@mui/icons-material/Logout';
import type { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {

  const { userProfile } = useSelector((state: RootState) => state.profile);

  const navigate = useNavigate();
  return (
    <Card className="card h-screen flex flex-col justify-between ">
      <div className="space-y-4 pl-5">
        <div className="py-5">
          <span className="font-bold text-2xl">Community</span>
        </div>
        <div className="space-y-8">
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
              <Avatar sx={{ width: 40, height: 40 }} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{userProfile?.firstName} {userProfile?.lastName}</span>
                <span className="text-xs text-gray-500">@{userProfile?.email}</span>
              </div>
            </div>
            <LogoutIcon sx={{ width: 20, height: 20 }} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar


