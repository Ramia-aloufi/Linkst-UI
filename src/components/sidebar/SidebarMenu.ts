import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/Person';
import ReelsIcon from '@mui/icons-material/VideoLibrary';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CommunityIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import AddBoxIcon from '@mui/icons-material/AddBox';
type SidebarMenuItem = {
    name: string;
    path: string;
    icon: React.ElementType;
}

export const SidebarMenu: SidebarMenuItem[] = [
    {
        name: 'Home',
        path: '/',
        icon: HomeIcon,
    },
    {
        name: 'Profile',
        path: '/profile/1',
        icon: ProfileIcon,
    },
        {
        name: 'Community',
        path: '/community',
        icon: CommunityIcon, 
    },
    {
        name: 'Reels',
        path: '/reels',
        icon: ReelsIcon,
    },
    {
        name: 'Create Reels',
        path: '/create-reels',
        icon: AddBoxIcon,
    },
    {
        name: 'Message',
        path: '/messages',
        icon: MessageIcon,
    },
    {
        name: 'Notifications',
        path: '/notifications',
        icon: NotificationsIcon,
    },

]