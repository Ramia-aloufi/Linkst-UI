import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { AppDispatch } from "../../redux/Store";
import { useDispatch } from "react-redux";
import { createStory } from "../../redux/story/StoryService";

type Props = {
  open: boolean;
  onClose: () => void;
};

const StoryModal = ({ open, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const StorySchema = z.object({
    caption: z.string().min(2).max(100),
    media: z.instanceof(FileList),
  });

  type StorySchemaType = z.infer<typeof StorySchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<StorySchemaType>({
    resolver: zodResolver(StorySchema),
    mode: "onChange",
  });

  const onSubmit = (data: StorySchemaType) => {
    const formdata = new FormData();
    const file = data.media[0];
    formdata.append("caption", data.caption);
    formdata.append("media", file);
    dispatch(createStory(formdata)).unwrap().then(() => {
      close();
    });
  };

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center items-center h-screen">
        <Box sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Story
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <TextField
              type="text"
              placeholder="Add a story..."
              {...register("caption")}
            />

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <input hidden type="file" accept="image/*,video/*" {...register("media")} />
            </Button>

            <div className="flex gap-3">
              <Button disabled={!isDirty || !isValid} variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={close}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </Modal>
  );
};

export default StoryModal;
