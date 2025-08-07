import { Card, CardMedia } from "@mui/material"
import type { Post } from "../../model/Post"

const ProfilePosts = ({post}:{post:Post}) => {
  return (
    <Card >
        <CardMedia
          component="img"
          image={post.media}
          alt="Post Image"
          sx={{ height: 300 }}
        />
    </Card>
  )
}

export default ProfilePosts