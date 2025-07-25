import { Alert, Avatar, Card, CircularProgress, IconButton, TextField, Typography } from "@mui/material"
import Stories from "./Stories"
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "./PostCard";
import { useCallback, useRef, useState } from "react";
import CreatePostModal from "./createPost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/Store";
import { getPosts } from "../redux/post/PostService";





const Home = () => {
    const { posts, error, page, hasNext } = useSelector((state: RootState) => state.post);
    const { userProfile } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [loading, setLoading] = useState(false)


    const toggleModal = () => {
        setOpenCreateModal((prev) => !prev);
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
        [ hasNext, dispatch, page]
    );
    if (error) {
        return <Alert severity="error">{error.message}.</Alert>
    }




    return (
        <div className="hideScrollBar space-y-5 overflow-y-scroll h-screen" >

            <Card className="flex items-center justify-evenly p-4 bg-gray-200">
                <div className="flex items-center justify-center flex-col cursor-pointer space-y-2">
                    <Avatar sx={{ width: 70, height: 70 }} >
                        <AddIcon sx={{ width: 40, height: 40 }} />
                    </Avatar>
                    <Typography variant="body2" >Add Story</Typography>
                </div>
                {Array.from(Array(5)).map((_, index) => (
                    <Stories key={index} img={`https://mui.com/static/images/avatar/${index + 1}.jpg`} name={`User ${index + 1}`} />
                ))}
            </Card>
            <Card onClick={toggleModal}>
                <div className="flex items-center" >
                    <Avatar sx={{ width: 40, height: 40, margin: '10px' }} >
                        {userProfile?.firstName.slice(0, 2)}

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
                        <div key={index} ref={isLastPost ? lastPostRef : null}>
                            <PostCard post={post} />
                        </div>

                    )

                })}
            </div>
            {loading && <CircularProgress />}
            <div>
                <CreatePostModal open={openCreateModal} user={userProfile} onClose={toggleModal} />
            </div>
        </div>
    )
}

export default Home