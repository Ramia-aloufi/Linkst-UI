import { Box, Typography } from '@mui/material'
import { useState } from 'react';
import StoryModal from './StoryModal';
import type { UserStory } from '../../model/UsersStory';

type StoriesProps = {
  user: UserStory;
}

const Stories = ({ user }: StoriesProps) => {

  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='flex items-center justify-center flex-col cursor-pointer space-y-2' onClick={toggleModal}>
      <Box
        sx={{
          borderRadius: "50%",
          padding: "4px",
          background: "linear-gradient(45deg, #7E68CA, #B4CA68)",
        }}
      >
        <Box
          component="img"
          src={user.profilePictureUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: (theme) => theme.palette.background.paper,
            padding: "8px",
          }}
        /></Box>
        <Typography variant="body2" >{user.firstName + " " + user.lastName}</Typography>
        {open && (
          <StoryModal userStory={user} open={open} onClose={toggleModal} />
        )}
    </div>
  )
}

export default Stories