import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import z from 'zod';

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

    const ProfileSchema = z.object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
    });

    type input = z.infer<typeof ProfileSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<input>({
        resolver: zodResolver(ProfileSchema),
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit((data) => {
                        console.log("Profile Data:", data);
                        handleClose();
                    })}>
                        <TextField {...register("firstName")} placeholder="First Name" error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth />
                        <TextField {...register("lastName")} placeholder="Last Name" error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth />
                        <Button
                            sx={{ padding: " .8rem 0rem", marginTop: "1rem" }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Save 
                        </Button>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}