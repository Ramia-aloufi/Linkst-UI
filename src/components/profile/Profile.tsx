import { Avatar, Box, Button, Card, CardActions, CardContent, Modal, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { ProfileModal } from "./ProfileModal";
import { getPostByUserId } from "../../redux/post/PostService";
import ProfilePosts from "./ProfilePosts";
import AddIcon from '@mui/icons-material/Add';
import ProfileImageUpdate from "./profileImageUpdate";
import img from "../../assets/header.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { followUser, getUserByFullName } from "../../redux/user/UserService";
import { getUserReels } from "../../redux/reels/ReelsService";
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "../../redux/auth/AuthSlice";

const tabs = [
  { value: "post", label: "Post" },
  { value: "reels", label: "Reels" }
]

const Profile = () => {
  const { fullName } = useParams<{ fullName: string }>();
  const { me, user } = useSelector((state: RootState) => state.user);
  const [openProfileImg, setOpenProfileImg] = useState(false);
  const { userReels } = useSelector((state: RootState) => state.reels)

  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  const [value, setValue] = useState('post');
  const [name, setName] = useState<"Profile" | "Header">("Profile");
  const [open, setOpen] = useState(false);
  const [isLogOut,setIsLogOut] = useState(false);

  const isCurrentUser = me?.id === user?.id;

  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  const handleFollow = () => {
    if (user)
      dispatch(followUser(user?.id)).unwrap().then(() => {
        if (fullName)
          dispatch(getUserByFullName(fullName));
      })
  }


  useEffect(() => {
    if (fullName)
      dispatch(getUserByFullName(fullName));
    dispatch(getPostByUserId());
  }, [dispatch, fullName]);

  useEffect(() => {
    if (user) {
      dispatch(getUserReels(user.id))
    }

  }, [dispatch, user])


  return (
    <Card >
      <div className="rounded-md ">
        <div className="h-[15rem] relative">
          <img
            src={user?.profile ? user?.profile.headerImageUrl || img : img}
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
        <div className="px-5 h-[4rem] mt-5 flex justify-between items-start relative">
          <div className="relative ">
            {user?.profile ? user?.profile?.profilePictureUrl ? (

              <Avatar className="transform -translate-y-24 border-2 border-white" sx={{ width: "10rem", height: "10rem" }} alt="profile" src={user?.profile?.profilePictureUrl} />
            ) : (
              <Avatar className="transform -translate-y-24 border-2 border-white" sx={{ width: "10rem", height: "10rem" }} alt="profile">
                {user?.firstName.slice(0, 2)}
              </Avatar>
            ) : (
              <Avatar className="transform -translate-y-24 border-2 border-white" sx={{ width: "10rem", height: "10rem" }} alt="profile">
                {user?.firstName.slice(0, 2)}
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
          {isCurrentUser ?
            <Button variant="outlined" onClick={() => setOpen(true)} > Edit Profile </Button>
            :
            <Button variant="outlined" onClick={handleFollow} > {me?.id && !user?.followers.includes(me.id) ? "following" : "unfollow"}</Button>}
        </div>
        <div className="pl-7 mt-2">
          <div className="">
            <Typography variant="h4" className="font-bold text-xl ">{user?.fullName}
              {isCurrentUser && <Button variant="text" color="error" onClick={() => setIsLogOut(true)} > <LogoutIcon />  </Button>}
            </Typography>
            <Typography variant="body1">@{user?.fullName}</Typography>
          </div>
          <div className="py-2">
            <Typography variant="body1" color="textSecondary" lineHeight={1.6} className="max-w-[400px]">{user?.profile ? user?.profile.bio : "No bio available"}</Typography>
          </div>
          <div className="flex gap-5 items-center py-4 ">
            <Typography variant="body1" fontWeight={500}>{user?.posts.length} Post</Typography>
            <Typography variant="body1" fontWeight={500}>{user?.followers.length} Followers</Typography>
            <Typography variant="body1" fontWeight={500}>{user?.following.length} Following</Typography>
          </div>
        </div>
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}  >
            <Tabs
              value={value}
              onChange={handleChange}
            >

              {tabs.map((tab) => (
                <Tab value={tab.value} label={tab.label} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="" >
            {value == "post" && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-5">
              {user?.posts.map((post) => (
                <div className="" key={post.id} onClick={() => navigator(`/post/${post.id}`)} >
                  <ProfilePosts key={post.id} post={post} />
                </div>
              ))}
            </div>}
            {value == "reels" && <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 p-5">
              {userReels.map((reels) => (
                <div className="" key={reels.id}  >
                  <div className="h-[300px]">
                    <video src={reels.videoUrl} className="w-full h-[80%] object-cover" controls />
                    <div className="p-2 flex flex-row gap-2 ">
                      <Avatar src={reels.user.profile?.profilePictureUrl}></Avatar>
                      <div className="">
                        <Typography> {reels.title}</Typography>
                        <Typography variant="caption">{new Date(reels.createdAt).toLocaleDateString()}</Typography>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>}
          </div>
        </section>
      </div>
      {isCurrentUser && <ProfileModal open={open} handleClose={handleClose} />}
      {isCurrentUser && <ProfileImageUpdate name={name} open={openProfileImg} onClose={() => setOpenProfileImg(false)} />}
      {isLogOut && 
      <div className="">
        <Modal open={isLogOut} onClose={()=>setIsLogOut(false)}>

          <Card className="absolute top-[50%] right-[50%] -translate-x-[-50%] p-6">
            <CardContent>
              <Typography>Are you sure you want to logout</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="error" onClick={()=>{dispatch(logOut());setIsLogOut(false)}} >Log out</Button>
              <Button variant="outlined" onClick={()=>setIsLogOut(false)}>cancel</Button>
            </CardActions>
          </Card>


        </Modal>

      </div>
      
      }
    </Card>
  )
}

export default Profile