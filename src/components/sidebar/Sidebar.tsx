import { Avatar, Box, Card, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material"
import { SidebarMenu } from "./SidebarMenu"
import LogoutIcon from '@mui/icons-material/Logout';
import { type AppDispatch, type RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Linkst11.png"
import { logOut } from "../../redux/auth/AuthSlice";
const Sidebar = () => {

  const { userProfile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation();

  const onLogOut = ()=>{
    dispatch(logOut())
    navigate("/login")
  }
  return (
    <Card className="card h-screen flex flex-col justify-between ">
      <div className="space-y-4 pl-5">
        <Box className="py-5 flex space-x-2">
          <img src={logo} alt="Logo" width="30" height="30"/>
          <Typography variant="h6">Linkst</Typography>
        </Box>
        <MenuList >
          {SidebarMenu.map((item) => {
               const isActive = location.pathname === item.path;
              const Icon = isActive ? item.activeIcon : item.icon;
              console.log("Active Path:", isActive);
              
          
          return(
            <MenuItem selected={isActive} onClick={() => {navigate(item.path)}} key={item.name} >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText>
              <Typography variant="body2">{item.name}</Typography>
              </ListItemText>
            </MenuItem>
          )})}
        </MenuList>
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


