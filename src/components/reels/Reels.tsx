import { Box, Typography, Avatar, Fab } from "@mui/material";
import type { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetAllReels } from "../../redux/reels/ReelsService";
import AddIcon from '@mui/icons-material/Add';
import ReelsForm from "./ReelsForm";
const Reels = () => {
  const { reels } = useSelector((state: RootState) => state.reels);
  const dispatch = useDispatch<AppDispatch>();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(GetAllReels());
  }, [dispatch]);

  return (
    <Box className="h-[90vh]  w-full flex items-center justify-center " sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? '#d7d7d7' : '#121212' }}>
      <Box
        sx={{
          height: "80vh",
          width: "400px",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          backgroundColor: "black",
          borderRadius: 2,
        }}
        className="hideScrollBar"
      >
        {reels.map((reel) => (
          <Box
            key={reel.id}
            sx={{
              height: "80vh",
              position: "relative",
              scrollSnapAlign: "start",
            }}
          >
            {/* Video */}
            <video
              src={reel.videoUrl}
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Gradient Overlay for readability */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
              }}
            />

            {/* User Info */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 16,
                color: "white",
              }}
            >
              <Box className="flex items-center ">
                <Avatar
                  src={reel.user.profile?.profilePictureUrl || `https://ui-avatars.com/api/?name=${reel.user.firstName}+${reel.user.lastName}`}
                  alt={`${reel.user.firstName} ${reel.user.lastName}`}
                  sx={{border: "2px solid white"}}
                />
                <Box className="ml-2">
                <Typography variant="subtitle1" fontWeight="bold">
                  {reel.user.firstName} {reel.user.lastName}
                </Typography>
            <Typography variant="body2" >
              {reel.title}
            </Typography>
              </Box>
            </Box>
            {/* Title */}


            </Box>

          </Box>
        ))}
      </Box>
      {/* Floating Add Reel Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 80,
        }}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>
      {/* Add Reel Form */}
      {openForm && (
        <ReelsForm open={openForm} onClose={() => setOpenForm(false)} />
      )}
    </Box>
  );
};

export default Reels;
