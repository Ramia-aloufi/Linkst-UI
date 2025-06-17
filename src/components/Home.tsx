import { Avatar, Card, IconButton, TextField, Typography } from "@mui/material"
import Stories from "./Stories"
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "./PostCard";





const Home = () => {
    const handlePhotoClick = () => {
        console.log("Photo icon clicked");
        // Trigger file input or open photo modal
    };

    const handleVideoClick = () => {
        console.log("Video icon clicked");
        // Trigger video upload or recording dialog
    };

    const handleArticleClick = () => {
        console.log("Article icon clicked");
        // Open article editor or form
    };
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
                        placeholder="post something..."
                        fullWidth
                        sx={{ margin: '10px' }}

                    />
                </div>
                <div className="flex justify-evenly items-center space-x-5 mb-2">
                    <IconButton onClick={handlePhotoClick} >
                        <InsertPhotoIcon sx={{ fontSize: 30 }} color="primary" />
                        <Typography  variant="caption" fontWeight={600}>Photo</Typography>
                    </IconButton>


                    <IconButton onClick={handleVideoClick} className="p-2">
                        <SmartDisplayIcon sx={{ fontSize: 30 }} color="secondary" />
                        <Typography variant="caption" fontWeight={600}>Video</Typography>
                    </IconButton>

                    <IconButton onClick={handleArticleClick} className="p-2">
                        <ArticleIcon sx={{ fontSize: 30 }} color="action" />
                        <Typography variant="caption" fontWeight={600}>Article</Typography>
                    </IconButton>
                </div>

            </Card>
            <Card className="w-full p-4 space-y-4">
                {Array.from(Array(3)).map((_,index)=>(
                    //how choose different images type not same image
                    <PostCard key={index} img={`https://mui.com/static/images/avatar/${index + 1}.jpg`} text={`This is post number ${index + 1}`} />
                    
                ))}
            </Card>
        </div>
    )
}

export default Home