import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, CircularProgress, TextField } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppDispatch, RootState } from '../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/post/PostService';
import type { User } from '../../model/User';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  outline: 'none',
};

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
  user: User | undefined
};



const PostSchema = z.object({
  postContent: z.string().min(1, 'Post content is required'),
  media: z.instanceof(FileList).optional(),
});

type PostSchemaType = z.infer<typeof PostSchema>;


const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
  const { register, handleSubmit, watch, reset , formState: { errors } } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema)
  });
  
  const watchImage = watch("media");

  const { loading, error } = useSelector((state: RootState) => state.post);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<PostSchemaType> = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append('content', data.postContent);
    if (data.media && data.media.length > 0) {
      formData.append('media', data.media[0]);
    }

    dispatch(createPost(formData)).unwrap().then(() => {
      reset();
      if (!loading && !error) {
        onClose();
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, p: 0, borderRadius: 2, overflow: 'hidden' }}>

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.default'
          }}
        >
          <span className="text-lg font-semibold">Create a post</span>
          <Button onClick={onClose} sx={{ minWidth: 0 }}>✕</Button>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2 }}>
            <Avatar sx={{ width: 48, height: 48, mr: 2 }}>
              {userProfile?.profilePictureUrl ? (
                <img src={userProfile.profilePictureUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                userProfile?.user.firstName.slice(0, 2)
              )}
            </Avatar>
            <Box>
              <span className="font-bold block">{userProfile?.user.firstName} {userProfile?.user.lastName}</span>
            </Box>
          </Box>

          {/* Text Input */}
          <Box sx={{ flexGrow: 1, px: 2 }}>
            <TextField
              placeholder="What do you want to talk about?"
              multiline
              minRows={3}
              fullWidth
              variant="standard"
              helperText={errors.postContent?.message}
              FormHelperTextProps={{ sx: { color: 'error.main' } }}
              InputProps={{ disableUnderline: true }}
              {...register("postContent")}
              sx={{ fontSize: '1rem' }}
            />
          </Box>

          {/* Media Preview */}
          {watchImage && watchImage.length > 0 && (
            <Box sx={{ px: 2, pb: 1 }}>
              <img
                src={URL.createObjectURL(watchImage[0])}
                alt="Post"
                className="w-full rounded-lg object-cover"
              />
            </Box>
          )}

          {/* Footer */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button component="label" sx={{ textTransform: 'none' }}>
              <AttachFileIcon />Media
              <input type="file" hidden {...register("media")} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 20, px: 3 }}
              disabled={loading || !watch("postContent")}
              onClick={()=>console.log("Post button clicked")}
            >
              {error && <span className="text-red-500">{error.message}</span> }
              {loading ? <CircularProgress size={20} /> : 'Post'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
export default CreatePostModal;