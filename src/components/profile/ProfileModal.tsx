import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import z from 'zod';
import type { AppDispatch, RootState } from '../../redux/Store';
import { getMe, updateUser } from '../../redux/user/UserService';
import { updateProfile } from '../../redux/profile/ProfileService';

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

export const ProfileModal = ({ open, handleClose }: { open: boolean; handleClose: () => void; }) => {
    const { me } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    // const {me} = {me:{firstName:"Rami", lastName:"Alaa", bio:"Hello, I'm Rami Alaa, a passionate software developer with a love for creating innovative solutions. With a background in computer science and years of experience in the tech industry, I specialize in full-stack development, working with technologies such as JavaScript, React, Node.js, and Python. I enjoy collaborating with cross-functional teams to bring ideas to life and deliver exceptional user experiences. When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or indulging in my love for photography and travel."}}

    const ProfileSchema = z.object({
        firstName: z.string().optional().or(z.literal("")),
        lastName: z.string().optional().or(z.literal("")),
        bio: z.string().max(200, "Bio must be at most 160 characters").optional().or(z.literal("")),
    });

    type input = z.infer<typeof ProfileSchema>

    const { register, handleSubmit, formState: { errors }, reset } = useForm<input>({
        resolver: zodResolver(ProfileSchema),
    });

    const onSubmit = (data: input) => {

        if (data.firstName || data.lastName) {
            const formData = new FormData();
            if (data.firstName) formData.append("firstName", data.firstName);
            if (data.lastName) formData.append("lastName", data.lastName);
            dispatch(updateUser(formData));
        }
        if (data.bio) {
            const formData = new FormData();
            formData.append("id", me?.profile?.id?.toString() || "");
            formData.append("bio", data.bio);
            dispatch(updateProfile(formData)).unwrap().then(() => {
                dispatch(getMe())
            })

        };
        reset();
        handleClose();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className=' flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h6" component="h2">Edit Profile</Typography>
                        <TextField {...register("firstName")} placeholder={me?.firstName} error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth />
                        <TextField {...register("lastName")} placeholder={me?.lastName} error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth />
                        <TextField {...register("bio")} placeholder={me?.profile.bio || "bio"} error={!!errors.bio} helperText={errors.bio?.message} fullWidth />
                        <div className="flex gap-4">
                            <Button
                                sx={{ padding: " .8rem 0rem", marginTop: "1rem" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Save
                            </Button>
                            <Button
                                sx={{ padding: " .8rem 0rem", marginTop: "1rem" }}
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}