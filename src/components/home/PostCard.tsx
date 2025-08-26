import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, TextField, Button } from "@mui/material"
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
import { createComments, deleteComment, getComments } from "../../redux/comment/CommentService";
import { likePost } from "../../redux/post/PostService";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CommentSchema = z.object({
  content: z.string().min(2).max(200),
});

type input = z.infer<typeof CommentSchema>;
const PostCard = ({ post }: { post: Post }) => {
  const { comments } = useSelector((state: RootState) => state.comment);
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const { register, handleSubmit, reset } = useForm<input>({
    resolver: zodResolver(CommentSchema)
  });  

  const [openComments, setOpenComments] = useState(false);

  const handleLike = () => {
    console.log("handleLike");
    dispatch(likePost(post.id))
  };
  const handleCommentOpen = () => {
    setOpenComments(!openComments);
    dispatch(getComments(post.id));
  };

  const handleCommentSubmit = (data: input) => {
    dispatch(createComments({ postId: post.id, comment: data.content }));
    reset();
  };

  return (
    <Card >
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
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(window.location.href);
              alert("Post link copied to clipboard!");
            }}
          >
            <ShareIcon />
          </IconButton>

        }
        title={post.user.fullName}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
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
        <IconButton onClick={(e) => {e.preventDefault();handleLike()}}>
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
              {comments.map((comment, index) => {
                const isUser = comment.user.id == me?.id;
                return <div className="flex items-center relative" key={index}>
                  <div className="flex items-center space-x-2 cursor-pointer" onClick={() => nav(`/profile/${comment.user.fullName}`)}>
                    {/* Display user avatar and name */}
                    <Avatar src={comment.user.profile?.profilePictureUrl || `https://ui-avatars.com/api/?name=${comment.user.fullName.charAt(0)}${comment.user.fullName.charAt(1)}`}>
                      {comment.user.fullName.charAt(0)}{comment.user.fullName.charAt(1)}
                    </Avatar>
                    <strong>{comment.user.fullName}:</strong>
                  </div>
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    {comment.comment}
                  </Typography>
                  {isUser &&
                    <DeleteOutlineIcon color="warning" className="absolute top-5 right-5 cursor-pointer" onClick={(e) => { e.stopPropagation(); dispatch(deleteComment(comment.id)).unwrap().then((data) => { dispatch(getComments(post.id)); alert(data) }) }} />}
                </div>
              })}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default PostCard