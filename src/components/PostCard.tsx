import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, TextField, Button } from "@mui/material"
import { red } from "@mui/material/colors"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import type { Post } from "../model/Post";
import CommentIcon from '@mui/icons-material/Comment';
import  { useState} from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import SendIcon from '@mui/icons-material/Send';
const CommentSchema = z.object({
  content: z.string().min(2).max(200),
});

type input = z.infer<typeof CommentSchema>;
const PostCard = ({post}:{post:Post}) => {

  const { register, handleSubmit } = useForm<input>({
    resolver: zodResolver(CommentSchema)
  });

  const [openComments, setOpenComments] = useState(false);

  const handleLike = () => {
    // Here you would typically also update the likes in the backend
    console.log("Liked");
  };

  const handleCommentSubmit = (data: input) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.firstName + " " + post.user.lastName}
        subheader={new Date(post.createdAt).toLocaleDateString()}        
        />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.caption}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={post.media}
        alt={post.caption}
        sx={{ height: 300 }} // 16:9 aspect ratio
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => setOpenComments(!openComments)}>
          <CommentIcon />
        </IconButton>
        {/* Display likes and comments count */}
        {post.likes.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
            {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
          </Typography>
        )}
        {post.comments.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
            {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
          </Typography>
        )}
      </CardActions>
      {openComments && (
        <CardContent>
          <form onSubmit={handleSubmit(handleCommentSubmit)}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              {...register("content")}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              <SendIcon />
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  )
}

export default PostCard