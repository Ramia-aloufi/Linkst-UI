import {
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState } from "react";

const trendingTopics = ["Fitness", "Photography", "Tech", "Books", "Travel"];

const posts = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Just finished a great workout 💪 #Fitness",
    image: null,
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "Exploring Iceland 🧊 #Travel",
    image: "https://source.unsplash.com/random/800x400?nature",
  },
];

export const Community = () => {
  const [selectedTopic, setSelectedTopic] = useState("");

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Community
      </Typography>

      {/* Trending Topics */}
      <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {trendingTopics.map((topic) => (
          <Chip
            key={topic}
            label={`#${topic}`}
            color={selectedTopic === topic ? "primary" : "default"}
            onClick={() => setSelectedTopic(topic)}
            clickable
          />
        ))}
      </Box>

      {/* Post Feed */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id}>
            <Card>
              <CardContent sx={{ display: "flex", gap: 2 }}>
                <Avatar src={post.avatar} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.user}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {post.content}
                  </Typography>
                  {post.image && (
                    <Box
                      component="img"
                      src={post.image}
                      alt="post"
                      sx={{
                        mt: 2,
                        width: "100%",
                        borderRadius: 2,
                        maxHeight: 300,
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Box>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Suggested Users or Groups */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Suggested Groups
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Card sx={{ p: 2, flex: 1 }}>
            <Typography fontWeight="bold">Photography Club</Typography>
            <Button size="small">Join</Button>
          </Card>
          <Card sx={{ p: 2, flex: 1 }}>
            <Typography fontWeight="bold">Tech Geeks</Typography>
            <Button size="small">Join</Button>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
