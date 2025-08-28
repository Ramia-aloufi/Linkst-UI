import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { Box, Button, Card, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserProjects } from "../../redux/project/ProjectService";
import type { UUID } from "crypto";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  borderRadius: '8px',
  outline: 'none',
};
const ProjectSection = ({ id }: { id: UUID | undefined }) => {
    const { projects } = useSelector((state: RootState) => state.project);
    const { me } = useSelector((state: RootState) => state.user);
    const isCurrentUser = me?.id === id;

    const schema = z.object({
        title: z.string().min(2).max(100),
        description: z.string().min(10).max(1000),
        projectUrl: z.string().url().optional(),
        images: z.instanceof(FileList),
        tools: z.array(z.string()).min(1).max(5),
    });

    type Input = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors } } = useForm<Input>(
        {
            resolver: zodResolver(schema)
        }
    );

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (id) {
            dispatch(getUserProjects(id));
        }
    }, [dispatch, id]);

    const onSubmit = (data: Input) => {
        console.log(data);

    };


    return (
        <Box>
            {projects && projects.length === 0 && (<p>No projects available</p>)}
            {projects.map((project) => (
                <li key={project.id}>{project.title}</li>
            ))}

            {isCurrentUser && (
                <Card className="p-4 my-4 flex justify-center items-center border-2 border-dashed border-gray-500 cursor-pointer hover:bg-gray-600">
                    <button onClick={() => setOpen(true)}>
                        Create Project
                    </button>
                </Card>
            )}
            {open && (
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={{ ...style, p: 0, borderRadius: 2, overflow: 'hidden' }}>
                        <h2 className="text-lg font-semibold mb-4">Create Project</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <TextField
                                error={!!errors.title}
                                label="Project Title"
                                fullWidth required
                                {...register("title")}
                            />
                            <label htmlFor="images">
                                <Box className="flex items-center justify-center">
                                    <AddPhotoAlternateIcon />
                                    <span>Upload Images</span>
                                </Box>
                                <input id="images" hidden type="file" multiple {...register("images")} />
                            </label>
                            <TextField
                                error={!!errors.description}
                                label="Description"
                                fullWidth multiline rows={4} required
                                {...register("description")}
                            />

                            <div className="flex justify-end gap-3">
                                <Button type="submit" variant="contained" color="primary">
                                    Create Project
                                </Button>
                                <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            )}

        </Box>
    )
}


export default ProjectSection;

