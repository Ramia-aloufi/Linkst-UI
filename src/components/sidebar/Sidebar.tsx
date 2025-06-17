import { Avatar, Card, Divider } from "@mui/material"
import { SidebarMenu } from "./SidebarMenu"
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
  return (
    <Card className="card h-screen flex flex-col justify-between ">
      <div className="space-y-4 pl-5">
        <div className="py-5">
          <span className="font-bold text-2xl">Community</span>
        </div>
        <div className="space-y-8">
          {SidebarMenu.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
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
                <span className="text-sm font-semibold">John Doe</span>
                <span className="text-xs text-gray-500">@example.com</span>
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