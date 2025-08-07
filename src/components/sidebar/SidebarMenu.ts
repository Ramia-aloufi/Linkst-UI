import HomeIcon from '@mui/icons-material/Home';
import ReelsIcon from '@mui/icons-material/VideoLibrary';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PeopleIcon from '@mui/icons-material/People';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
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

        {
        name: 'Community',
        path: '/community',
        icon: PeopleOutlinedIcon, 
        activeIcon: PeopleIcon,
    },
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
    },
    {
        name: 'Notifications',
        path: '/notifications',
        icon: NotificationsOutlinedIcon,
        activeIcon: NotificationsIcon,
    },
]