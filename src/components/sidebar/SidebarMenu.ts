import HomeIcon from '@mui/icons-material/Home';
import ReelsIcon from '@mui/icons-material/VideoLibrary';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TextsmsIcon from '@mui/icons-material/Textsms';

type SidebarMenuItem = {
    name: string;
    path: string;
    icon: React.ElementType;
    activeIcon: React.ElementType;
}

export const SidebarMenu: SidebarMenuItem[] = [
    {
        name: 'Home',
        path: '/',
        icon: HomeOutlinedIcon,
        activeIcon: HomeIcon,
    },

    //     {
    //     name: 'Community',
    //     path: '/community',
    //     icon: PeopleOutlinedIcon, 
    //     activeIcon: PeopleIcon,
    // },
    {
        name: 'Reels',
        path: '/reels',
        icon: OndemandVideoIcon,
        activeIcon: ReelsIcon,
    },
    {
        name: 'Message',
        path: '/messages',
        icon: TextsmsOutlinedIcon,
        activeIcon: TextsmsIcon,
    }
    // {
    //     name: 'Notifications',
    //     path: '/notifications',
    //     icon: NotificationsOutlinedIcon,
    //     activeIcon: NotificationsIcon,
    // },
]