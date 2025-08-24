import { Avatar, Box, LinearProgress, Modal, Typography } from "@mui/material";
import { useState } from "react";
import type { UserStory } from "../../model/UsersStory";
import CloseIcon from '@mui/icons-material/Close';
type Props = {
  userStory: UserStory;
  open: boolean;
  onClose: () => void;
};

const StoryModal = ({ userStory, open, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);



  const handleEnded = () => {
    if (currentIndex < userStory.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentIndex < userStory.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("End of stories");
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onClose();
    }
  };



  return (
    <Modal open={open} onClose={onClose} className="backdrop-blur-sm relative z-100"  >
      
      {/* Video container */}
      <Box className="absolute w-[400px] h-[600px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg focus:hidden overflow-hidden  bg-black border-transparent" onClick={(e) => e.stopPropagation()}>
        {/* Progress */}
        <Box>
          <LinearProgress variant="determinate" value={(currentIndex + 1) / userStory.stories.length * 100} />
        </Box>
        
        {/* User info overlay */}
        <Box sx={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))" }} className="absolute bottom-0 left-0 w-full flex items-center space-x-2  z-10 p-3 text-white">
          <Avatar
            className=" border-2 border-white"
            src={userStory.profilePictureUrl || "/default-profile.png"}
            alt={`${userStory.firstName} ${userStory.lastName}`}
          />
          <Box>
            <div className="flex items-center gap-2 ">
              <Typography variant="body2" fontWeight="bold">
                {userStory.firstName} {userStory.lastName}
              </Typography>
              <Typography variant="caption" fontWeight={"light"}>
                {userStory.stories[currentIndex]?.createdAt.toString().slice(0, 10)}
              </Typography>
            </div>
            <Typography variant="caption" >
              {userStory.stories[currentIndex]?.caption}
            </Typography>
          </Box>
        </Box>
        {/* Close button */}
        <Box className="absolute top-4 right-4 z-10 cursor-pointer">
          <Box
            onClick={onClose}
            sx={{ borderColor: "white", backdropFilter: "blur(5px)", color: "white", borderRadius: "50%", borderWidth: "1px", borderStyle: "solid", padding: "4px" }}
            className="text-white">
            <CloseIcon fontSize="small" />
          </Box>
        </Box>

        {/* Story video */}
        {userStory.stories.length > 0 && (
          <Box className="w-full h-full">
            {userStory.stories[currentIndex].mediaType == "video" ? (
              <video
                key={currentIndex}
                src={userStory.stories[currentIndex].media}
                autoPlay
                onEnded={handleEnded}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                key={currentIndex}
                onEnded={handleEnded}
                src={userStory.stories[currentIndex].media}
                alt={userStory.stories[currentIndex].caption}
                className="w-full h-full object-cover"
              />
            )}
          </Box>
        )}
        {/* Click zones for next/prev */}
        <Box
          className="absolute top-20 left-0 w-1/2 h-full cursor-pointer "
          onClick={handlePrev}
        />
        <Box
          className="absolute top-20 right-0 w-1/2 h-full cursor-pointer"
          onClick={handleNext}
        />
      </Box>
    </Modal>
  );
};

export default StoryModal;
