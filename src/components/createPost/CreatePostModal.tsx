import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, CircularProgress, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import DescriptionIcon from '@mui/icons-material/Description';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppDispatch, RootState } from '../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/post/PostService';



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
};



const PostSchema = z.object({
  postContent: z.string().min(1, 'Post content is required'),
  postImage: z.instanceof(FileList).optional(),
  postVideo: z.instanceof(FileList).optional(),
  postFile: z.instanceof(FileList).optional(),
});

type PostSchemaType = z.infer<typeof PostSchema>;


const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
  const { register, handleSubmit, watch, reset } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema)
  });
  const watchImage = watch("postImage");
  const { loading, error } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: PostSchemaType) => {
    const formData = new FormData();
    formData.append('content', data.postContent);
    formData.append('caption', data.postContent);

    if (data.postImage && data.postImage.length > 0) {
      formData.append('media', data.postImage[0]);
    }
    if (data.postVideo && data.postVideo.length > 0) {
      formData.append('media', data.postVideo[0]);
    }
    if (data.postFile && data.postFile.length > 0) {
      formData.append('media', data.postFile[0]);
    }


    dispatch(createPost(formData));
    reset();
    if (!loading && !error) {
      console.log("Post created successfully");
      onClose();
    }
  };



  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center  mb-4">
            <Avatar sx={{ width: 40, height: 40, margin: '10px' }} />
            <div className="flex flex-col">
              <span className="text-gray-500 text-lg  font-bold">username</span>
              <span className="text-gray-500 text-sm ">@username</span>
            </div>
          </div>
          {error && <span className="text-red-500 text-sm">{error.message}</span>}
          <TextField
            style={{ outline: 'none' }}
            label="What's on your mind?"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            {...register("postContent")}
          />
          <div className="flex items-center justify-between space-x-4 mb-4">
            <div className="">
              <input type="file" accept='image/*' {...register("postImage")} id='postImage' className='hidden' />
              <label htmlFor="postImage">
                <ImageIcon sx={{ color: '#1976d2', cursor: 'pointer' }} />
                <span className="text-gray-500">Image</span>
              </label>
            </div>
            <div className="">
              <input type="file" accept='video/*' {...register("postVideo")} id='postVideo' className='hidden' />
              <label htmlFor="postVideo">
                <VideoCallIcon sx={{ color: '#1976d2', cursor: 'pointer' }} />
                <span className="text-gray-500">Video</span>
              </label>
            </div>
            <div className="">
              <input type="file" accept='.pdf,.doc,.docx' {...register("postFile")} id='postFile' className='hidden' />
              <label htmlFor="postFile">
                <DescriptionIcon sx={{ color: '#1976d2', cursor: 'pointer' }} />
                <span className="text-gray-500">File</span>
              </label>
            </div>
          </div>
          {watchImage && watchImage.length > 0 && (
            <div className="mb-4">
              <img src={URL.createObjectURL(watchImage[0])} alt="Post" className="w-full h-[200px] object-cover object-center rounded-md" />
            </div>
          )}
          <Button type="submit" variant="contained" color="primary" >
            {loading ? <CircularProgress size={24} /> : 'Post'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
export default CreatePostModal;