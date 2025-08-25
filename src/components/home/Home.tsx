import { Alert, Avatar, Card, CircularProgress, Grid, IconButton, TextField, Typography } from "@mui/material"
import Stories from "./Stories"
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "./PostCard";
import { useCallback, useRef, useState } from "react";
import CreatePostModal from "../createPost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { getPosts } from "../../redux/post/PostService";
import RightBar from "./Rightbar";
import AddStoryModal from "../story/AddStoryModal";
import { useNavigate } from "react-router-dom";





const Home = () => {
    const { posts, error, page, hasNext } = useSelector((state: RootState) => state.post);
    const { me,usersStories } = useSelector((state: RootState) => state.user);
    // const { stories } = useSelector((state: RootState) => state.story);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openStoryModal, setOpenStoryModal] = useState(false);

    const [loading, setLoading] = useState(false)


    const toggleModal = () => {
        setOpenCreateModal((prev) => !prev);
    };

    const toggleStoryModal = () => {
        
        setOpenStoryModal((prev) => !prev);
    };


    const observer = useRef<IntersectionObserver | null>(null);

    const lastPostRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNext) {
                    setLoading(true)
                    setTimeout(() => {
                        dispatch(getPosts(page));
                        setLoading(false)
                    }, 3000)
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasNext, dispatch, page]
    );
    if (error) {
        return <Alert severity="error">{error.message}.</Alert>
    }




    return (
        <Grid container spacing={12} >
            <Grid size={{ sm: 12, lg: 8 }} className="hideScrollBar space-y-5 overflow-y-scroll h-screen" >
                <Card className="flex items-center justify-evenly p-4 bg-gray-200 min-w-[10px] overflow-x-scroll">
                    <div className="flex items-center justify-center flex-col cursor-pointer space-y-2 " onClick={toggleStoryModal}>
                        <Avatar sx={{ width: 70, height: 70 }} >
                            <AddIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                        <Typography variant="body2" >Add Story</Typography>
                    </div>
                    {usersStories?.map((users, index) => (
                        <Stories key={index} user={users} />
                    ))}
                </Card>
                <Card onClick={toggleModal}>
                    <div className="flex items-center" >
                        <Avatar sx={{ width: 40, height: 40, margin: '10px' }} >
                            {me?.profile?.profilePictureUrl ?
                                <img src={me.profile.profilePictureUrl} alt="Avatar" />
                                : me?.firstName.slice(0, 2)}

                        </Avatar>
                        <TextField
                            variant="outlined"
                            fullWidth
                            sx={{ margin: '10px' }}

                        />
                    </div>
                    <div className="flex justify-evenly items-center space-x-5 mb-2">
                        <IconButton  >
                            <InsertPhotoIcon sx={{ fontSize: 30 }} color="primary" />
                            <Typography variant="caption" fontWeight={600}>Photo</Typography>
                        </IconButton>


                        <IconButton className="p-2">
                            <SmartDisplayIcon sx={{ fontSize: 30 }} color="secondary" />
                            <Typography variant="caption" fontWeight={600}>Video</Typography>
                        </IconButton>

                        <IconButton className="p-2">
                            <ArticleIcon sx={{ fontSize: 30 }} color="action" />
                            <Typography variant="caption" fontWeight={600}>Article</Typography>
                        </IconButton>
                    </div>

                </Card>
                <div className="w-full  space-y-4">

                    {posts.map((post, index) => {
                        const isLastPost = index === posts.length - 1;

                        return (
                            <div key={index} onClick={() => navigate(`/post/${post.id}`)} ref={isLastPost ? lastPostRef : null}>
                                <PostCard post={post} />
                            </div>

                        )

                    })}
                </div>
                {loading && <CircularProgress />}
                <div>
                    <CreatePostModal open={openCreateModal} onClose={toggleModal} />
                    <AddStoryModal open={openStoryModal} onClose={toggleStoryModal} />
                </div>
            </Grid>
            {/* Right Sidebar */}
            <Grid size={{ sm: 0, lg: 4 }}>
                <RightBar />
            </Grid>
        </Grid>
    )
}

export default Home