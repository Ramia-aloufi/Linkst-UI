import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { updateProfile } from "../../redux/profile/ProfileService";
type ProfileImageUpdateProps = {
    open: boolean;
    onClose: () => void;
    name: "Profile" | "Header";
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    outline: 'none',
    overflowY: 'scroll',
    boxShadow: 24,
    p: 10,
    borderRadius: '10px',
};
const ProfileImageUpdate = ({ open, onClose, name }: ProfileImageUpdateProps) => {
    const { loading, error, userProfile } = useSelector((state: RootState) => state.profile);
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const onSave = () => {
        if (file) {
            const formData = new FormData();
            formData.append("id", userProfile?.id || "");

            if (name === "Profile") {
                formData.append("profilePictureUrl", file);
                dispatch(updateProfile(formData))
            }
            if (name === "Header") {
                formData.append("headerImageUrl", file);
                dispatch(updateProfile(formData))
            }
        }
        if (!error && !loading) {
            onClose();
            setFile(null);
        }
    }
    const handleClose = () => {
        onClose();
        setFile(null);
    };

    return (
        <Modal open={open} onClose={handleClose} >
            <Box sx={style} className="flex flex-col gap-4">
                <Typography variant="h6">{name === "Profile" ? "Update Profile Image" : "Update Header Image"}</Typography>
                {/* Add your image upload form here */}
                <input type="file" hidden accept="image/*" id="Upload Profile Image" onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setFile(files[0]);
                    }
                }} />
                <label htmlFor="Upload Profile Image" className="bg-gray-100 bg-opacity-5 p-2 rounded-md h-[100px] flex flex-col items-center justify-center">
                    <AddPhotoAlternateIcon />
                    <Typography variant="body2" >Click to upload a new profile image</Typography>
                    {error && <Typography variant="body2" color="error">{error.message}</Typography>}
                </label>
                {file && (
                    <Box className="flex flex-col items-center">
                        <Avatar sx={{ width: 100, height: 100 }} src={URL.createObjectURL(file)}></Avatar>
                    </Box>
                )}
                <div className="flex gap-3">
                    <Button variant="contained" color="primary" onClick={onSave}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ProfileImageUpdate;


