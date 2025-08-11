import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { CreateReel } from "../../redux/reels/ReelsService";
import { useState } from "react";

const reelSchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  video: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Video is required"),
});

type ReelFormData = z.infer<typeof reelSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddReelForm: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
    const [preview, setPreview] = useState<string | null>(null);
  const { loading } = useSelector((state: RootState) => state.reels);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReelFormData>({
    resolver: zodResolver(reelSchema),
  });

  const onSubmit = async (data: ReelFormData) => {
    const formData = new FormData();
    formData.append("title", data.caption);
    formData.append("videoUrl", data.video);

try {
    await dispatch(CreateReel(formData)).unwrap();
    console.log("Creating reel...");
    onClose();
  } catch (err) {
    console.error("Error creating reel:", err);
  }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Reel</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Caption"
            {...register("caption")}
            error={!!errors.caption}
            helperText={errors.caption?.message}
            fullWidth
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Upload Video
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                      setPreview(URL.createObjectURL(file));
                  setValue("video", file, { shouldValidate: true });
                }
              }}
            />
          </Button>
          {errors.video && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.video.message}
            </p>
          )}
                    {/* Video Preview */}
          {preview && (
            <video
              src={preview}
              controls
              style={{
                width: "100%",
                maxHeight: "300px",
                marginTop: "10px",
                borderRadius: "8px"
              }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Posting..." : "Post Reel"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddReelForm;
