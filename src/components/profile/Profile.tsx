import { Avatar, Box, Button, Card, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { GetUserProfile } from "../../redux/profile/ProfileService";
import { ProfileModal } from "./ProfileModal";
import { getPostByUserId } from "../../redux/post/PostService";
import ProfilePosts from "./ProfilePosts";
import AddIcon from '@mui/icons-material/Add';
import ProfileImageUpdate from "./profileImageUpdate";
import img from "../../assets/header.jpg";


const tabs = [
  { value: "post", label: "Post" },
  { value: "reels", label: "Reels" },
  { value: "saved", label: "Saved" },
  { value: "repost", label: "Repost" },
]

const Profile = () => {
  const { userPosts } = useSelector((state: RootState) => state.post);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const [openProfileImg, setOpenProfileImg] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState('post');
  const [name, setName] = useState<"Profile" | "Header">("Profile");
  const [open, setOpen] = useState(false);

  const isCurrentUser = true;

  const handleClose = () => setOpen(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(GetUserProfile());
    dispatch(getPostByUserId());
  }, [dispatch]);


  return (
    <Card >
      <div className="rounded-md ">
        <div className="h-[15rem] relative">
          <img
            src={userProfile?.headerImageUrl || img}
            alt="profile"
            className="w-full h-full object-cover rounded-t-md"
          />
          {isCurrentUser &&
            <Box sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }} className=" absolute top-4 right-4 p-2 rounded-full" onClick={() => { setOpenProfileImg(true); setName("Header"); }}>
              <AddIcon />
            </Box>
          }
        </div>
        <div className="px-5 h-[5rem] mt-5 flex justify-between items-start relative">
          <div className="relative ">
            {userProfile?.profilePictureUrl ? (

              <Avatar className="transform -translate-y-24 border-2 border-white" sx={{ width: "10rem", height: "10rem" }} alt="profile" src={userProfile?.profilePictureUrl} />
            ) : (
              <Avatar className="transform -translate-y-24 border-2 border-white" sx={{ width: "10rem", height: "10rem" }} alt="profile">
                {userProfile?.user.firstName.slice(0, 2)}
              </Avatar>
            )}
            {isCurrentUser &&
              <Box sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }} className=" absolute top-0 right-0 p-2 rounded-full" onClick={() => { setOpenProfileImg(true); setName("Profile"); }}>
                <AddIcon />
              </Box>
            }
          </div>
          {isCurrentUser ? <Button variant="outlined" onClick={() => setOpen(true)} > Edit Profile </Button> : <Button variant="outlined" > Follow</Button>}
        </div>
        <div className="pl-7">
          <div className="">
            <Typography variant="h4" className="font-bold text-xl ">{userProfile?.user.fullName}</Typography>
            <Typography variant="body1">@{userProfile?.user.fullName.replace(" ", "_").toLocaleLowerCase()}</Typography>
          </div>
          <div className="py-2">
            <Typography variant="body2">{userProfile?.bio || "No bio available"}</Typography>
          </div>
          <div className="flex gap-5 items-center py-7 ">
            <span>{userPosts.length} post</span>
            <span>{userProfile?.user.followers.length} followers</span>
            <span>{userProfile?.user.following.length} following</span>
          </div>
        </div>
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}  >
            <Tabs
              value={value}
              onChange={() => handleChange}            >

              {tabs.map((tab) => (<Tab value={tab.value} label={tab.label} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="">
            {value == "post" && <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 p-5">
              {userPosts.map((post) => (
                <ProfilePosts key={post.id} post={post} />
              ))}
            </div>}
          </div>
        </section>
      </div>
      <ProfileModal open={open} handleClose={handleClose} />
      <ProfileImageUpdate name={name} open={openProfileImg} onClose={() => setOpenProfileImg(false)} />


    </Card>
  )
}

export default Profile