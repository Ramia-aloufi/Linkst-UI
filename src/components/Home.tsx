import { Avatar, Card, IconButton, TextField, Typography } from "@mui/material"
import Stories from "./Stories"
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import CreatePostModal from "./createPost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/Store";
import { getPosts } from "../redux/post/PostService";





const Home = () => {

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const {posts} = useSelector((state:RootState) => state.post);
    const dispatch = useDispatch<AppDispatch>();


    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
        console.log("Create Post Modal Opened");
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
        console.log("Create Post Modal Closed");
    };

    useEffect(() => {
        // Fetch posts when the component mounts
        dispatch(getPosts())
        console.log("Fetching posts...");
    }, [dispatch]);




    return (
        <div className=" space-y-5">

            <Card className="flex items-center justify-between p-4 bg-gray-200">
                <div className="flex items-center justify-center flex-col cursor-pointer">
                    <Avatar sx={{ width: 80, height: 80, margin: '0 10px' }} >
                        <AddIcon sx={{ width: 40, height: 40 }} />
                    </Avatar>
                    <span>Add Story</span>
                </div>
                {Array.from(Array(5)).map((_, index) => (
                    <Stories key={index} img={`https://mui.com/static/images/avatar/${index + 1}.jpg`} name={`User ${index + 1}`} />
                ))}
            </Card>
            <Card>
                <div className="flex items-center">
                    <Avatar sx={{ width: 40, height: 40, margin: '10px' }} />
                    <TextField
                        variant="outlined"
                        fullWidth
                        sx={{ margin: '10px' }}
                        onClick={handleOpenCreateModal}

                    />
                </div>
                <div className="flex justify-evenly items-center space-x-5 mb-2">
                    <IconButton onClick={handleOpenCreateModal} >
                        <InsertPhotoIcon sx={{ fontSize: 30 }} color="primary" />
                        <Typography  variant="caption" fontWeight={600}>Photo</Typography>
                    </IconButton>


                    <IconButton onClick={handleOpenCreateModal} className="p-2">
                        <SmartDisplayIcon sx={{ fontSize: 30 }} color="secondary" />
                        <Typography variant="caption" fontWeight={600}>Video</Typography>
                    </IconButton>

                    <IconButton onClick={handleOpenCreateModal} className="p-2">
                        <ArticleIcon sx={{ fontSize: 30 }} color="action" />
                        <Typography variant="caption" fontWeight={600}>Article</Typography>
                    </IconButton>
                </div>

            </Card>
            <Card className="w-full p-4 space-y-4">
                {posts.map((post, index) => (
                    //how choose different images type not same image
                    <PostCard key={index} post={post} />
                ))}
            </Card>

            <div>
                <CreatePostModal open={openCreateModal} onClose={handleCloseCreateModal} />
            </div>
        </div>
    )
}

export default Home