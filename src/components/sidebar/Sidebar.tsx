import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarMenu } from "./SidebarMenu";
import { type RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Linkst11.png";
import { ThemeToggleButton } from "./ThemeToggleButton";

const Navbar = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
const img = me?.profile?.profilePictureUrl || "https://www.w3schools.com/howto/img_avatar.png";
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <Card
      className="flex items-center justify-between px-4"
      sx={{
        height: 64,
        borderRadius: 0,
        boxShadow: 1,
      }}
    >
      {/* Left: Logo + text always visible */}
      <Box
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" width="30" height="30" />
        <Typography variant="h6" noWrap>
          Linkst
        </Typography>
      </Box>

      {/* Desktop Menu: visible md+ */}
      <MenuList
        className="hidden md:flex flex-row p-0"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {SidebarMenu.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <MenuItem
              className="flex  items-center justify-center"
              key={item.name}
              selected={isActive}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1,
                minWidth: "auto",
                px: 3,
                opacity: isActive ? 1 : 0.7
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{item.name}</Typography>}
              />
            </MenuItem>
          );
        })}
      </MenuList>

      {/* Desktop right side: Profile and ThemeToggle - visible md+ */}
      <Box
        className="hidden md:flex items-center space-x-3"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate(`/profile/${me?.fullName}`)}
        >
          <Avatar sx={{ width: 40, height: 40 }}>
            <img src={img} alt="Profile" />
          </Avatar>
          <Box className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold">
              {me?.firstName} {me?.lastName}
            </span>
            <span className="text-xs text-gray-500">
              @{me?.firstName?.toLowerCase()}_{me?.lastName?.toLowerCase()}
            </span>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <ThemeToggleButton />
      </Box>

      {/* Mobile Hamburger Menu: visible xs to sm */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton onClick={handleOpenNavMenu} size="large" color="inherit">
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
        >
          {/* Sidebar items */}
          {SidebarMenu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <MenuItem
                key={item.name}
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  handleCloseNavMenu();
                }}
                
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText >{item.name}</ListItemText>
              </MenuItem>
            );

          })}
          {/* Theme toggle button */}
          <Divider />
          <ThemeToggleButton />
          <Divider />
          {/* Theme toggle inside menu */}
          <MenuItem
            onClick={() => {
              // close menu after toggling, or not depending on your toggle design
              handleCloseNavMenu();
            }}
          >
            <Box
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <Avatar sx={{ width: 40, height: 40 }}>
                <img src={img} alt="Profile" />
              </Avatar>
              <Box className="flex flex-col">
                <span className="text-sm font-semibold">
                  {me?.firstName} {me?.lastName}
                </span>
                <span className="text-xs text-gray-500">
                  @{me?.firstName?.toLowerCase()}_{me?.lastName?.toLowerCase()}
                </span>
              </Box>
            </Box>
          </MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default Navbar;
