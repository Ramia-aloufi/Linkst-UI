import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, TextField, Button } from "@mui/material"
import { red } from "@mui/material/colors"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import type { Post } from "../../model/Post";
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { createComments, getComments } from "../../redux/comment/CommentService";
import { likePost } from "../../redux/post/PostService";
const CommentSchema = z.object({
  content: z.string().min(2).max(200),
});

type input = z.infer<typeof CommentSchema>;
const PostCard = ({ post }: { post: Post }) => {  
  const { comments } = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<input>({
    resolver: zodResolver(CommentSchema)
  });

  const [openComments, setOpenComments] = useState(false);

  const handleLike = () => {
    console.log("Liked");
    dispatch(likePost(post.id));
  };
  const handleCommentOpen = () => {
    setOpenComments(!openComments);
    dispatch(getComments(post.id));
    reset();
  };

  const handleCommentSubmit = (data: input) => {
    dispatch(createComments({ postId: post.id, comment: data.content }));
    console.log(data);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          post.user.profilePictureUrl ? (
            <Avatar src={post.user.profilePictureUrl} />
          ) : (
            <Avatar>
              {post.user.fullName.charAt(0)}{post.user.fullName.charAt(1)}
            </Avatar>
          )}
        action={
          <IconButton>
            <ShareIcon />
          </IconButton>

        }
        title={post.user.fullName}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2"  style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </Typography>
      </CardContent>
      {post.media && post.media.length > 0 &&
      <CardMedia
        component="img"
        image={post.media}
        alt={post.caption}
        sx={{ height: 300 }}
      />
}
      <CardActions disableSpacing>
        <IconButton onClick={handleLike}>
          {post.likedByCurrentUser ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteIcon />
          )}
          {/* Display likes count */}
          {post.likeCount > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
              {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
            </Typography>
          )}
        </IconButton>

        <IconButton onClick={() => handleCommentOpen()}>
          <CommentIcon />
          {/* Display comments count */}
          {post.commentCount > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </Typography>
          )}
        </IconButton>

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
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" color="primary">
                    <SendIcon />
                  </IconButton>
                ),
              }}
            >
              <Button type="submit" variant="outlined" color="primary">
                <SendIcon />
              </Button>
            </TextField>
          </form>
          {/* Display comments */}
          {comments.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          )}
          {comments.length > 0 && (
            <div className="space-y-2 ">
              {comments.map((comment, index) => (
                <div className="flex items-center" key={index}>
                  <div className="flex items-center">
                    {/* Display user avatar and name */}
                    <Avatar sx={{ bgcolor: red[500], width: 32, height: 32, marginRight: 1 }}>
                      {comment.user.fullName.charAt(0)}{comment.user.fullName.charAt(1)}
                    </Avatar>
                    <strong>{comment.user.fullName}:</strong>
                  </div>
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>

                    {comment.comment}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default PostCard