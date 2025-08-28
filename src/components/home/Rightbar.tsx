
import { Avatar, Box, Card, Chip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getSomeUsers } from '../../redux/user/UserService';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/Store';




const RightBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { someUsers } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Fetch some users when the component mounts
    dispatch(getSomeUsers());
  }, [dispatch]);

  return (
    <Card className="bg-gray-700">
      <div className="p-4">
        <Typography className="text-lg font-semibold">Add To Your Feed</Typography>
        {someUsers && someUsers.length > 0 && (
          <Box>
            {someUsers.map((user) => (
              <Box key={user.id} className="flex items-center gap-2 mb-4">
                <Avatar src={user.profile ? user.profile.profilePictureUrl : `https://ui-avatars.com/api/?name=${user.firstName}`} alt={user.firstName} />
                <div className="">
                  <Typography>{user.firstName} {user.lastName}</Typography>
                  <div className="flex gap-1 opacity-30">
                    <Chip size='small'  variant='outlined' label="Chip Filled" />
                    <Chip size='small'  variant='outlined' label="Chip Filled" />
                    <Chip size='small'  variant='outlined' label="Chip Filled" />
                  </div>

                </div>
              </Box>
            ))}
          </Box>
        )}
      </div>
    </Card>
  )
}

export default RightBar