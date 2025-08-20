import { Avatar, Box, Modal, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import type { UserStory } from "../../model/UsersStory";

type Props = {
  userStory: UserStory;
  open: boolean;
  onClose: () => void;
};

const StoryModal = ({ userStory, open, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(0);
  }, [open]);

  const handleEnded = () => {
    if (currentIndex < userStory.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentIndex < userStory.stories.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="flex items-center justify-center h-screen">
        {/* Video container */}
        <Box className="relative w-[600px] h-[400px] bg-black rounded-lg overflow-hidden">
          {/* User info overlay */}
          <Box className="flex items-center space-x-3 absolute top-4 left-4 z-10">
            <Avatar
              src={userStory.profilePictureUrl || "/default-profile.png"}
              alt={`${userStory.firstName} ${userStory.lastName}`}
            />
            <Box>
            <Typography variant="h6" className="text-white">
              {userStory.firstName} {userStory.lastName}
            </Typography>
            <Typography variant="body2" className="text-gray-300">
              {userStory.stories[currentIndex]?.createdAt.toLocaleString()}
            </Typography>
            </Box>
          </Box>

          {/* Story video */}
          {userStory.stories.length > 0 && (
            <video
              ref={videoRef}
              key={currentIndex}
              src={userStory.stories[currentIndex].media}
              autoPlay
              muted
              onEnded={handleEnded}
              className="w-full h-full object-cover"
            />
          )}

          {/* Click zones for next/prev */}
          <Box
            className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
            onClick={handlePrev}
          />
          <Box
            className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
            onClick={handleNext}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default StoryModal;
