import { Box, Button, Modal, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import  z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


type Props = {
  open: boolean;
  onClose: () => void;
};

const StoryModal = ({ open, onClose }: Props) => {

const StorySchema = z.object({
  caption: z.string().min(2).max(100),
  media: z.string().url(),
});

type StorySchemaType = z.infer<typeof StorySchema>;


const { register, handleSubmit } = useForm<StorySchemaType>(
    {
        resolver: zodResolver(StorySchema),
    }
);

  return (
    <Modal open={open} onClose={onClose} >
        <div className="flex justify-center items-center h-screen">
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Create Story
                </Typography>
          <form onSubmit={handleSubmit(data => console.log(data))} className="flex flex-col space-y-4">
            <input type="text" placeholder="Add a story..." {...register("caption")} />
            <Button component="label">
                Upload
                <input type="file" {...register("media")} hidden />
            </Button>
            <div className="flex gap-3">
            <Button variant="contained" type="submit">Submit</Button>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        </Box>
        </div>
    </Modal>
  )
}

export default StoryModal