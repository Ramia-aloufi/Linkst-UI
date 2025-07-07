import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material"
import { useEffect, useState, type SyntheticEvent } from "react";
import PostCard from "../PostCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store";
import { GetUserProfile } from "../../redux/profile/ProfileService";
import { ProfileModal } from "./ProfileModal";

const Profile = () => {
  // const { id } = useParams<{ id: string }>();
  const isCurrentUser = true;
  const [value, setValue] = useState('post');
  const tabs = [
    { value: "post", label: "Post" },
    { value: "reels", label: "Reels" },
    { value: "saved", label: "Saved" },
    { value: "repost", label: "Repost" },
  ]
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

  const dispatch = useDispatch<AppDispatch>();
  const { userProfile } = useSelector((state:RootState) => state.profile);
  useEffect(() => {
    dispatch(GetUserProfile());
  }, [dispatch]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card className="py-10">
      <div className="rounded-md ">
        <div className="h-[15rem]">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
            alt="profile"
            className="w-full h-full object-cover rounded-t-md"
          />

        </div>
        <div className="px-5 h-[5rem] mt-5 flex justify-between items-start">
          <Avatar className="transform -translate-y-24 border-2 border-white" sx={{ width: "10rem", height: "10rem" }} alt="profile" src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" />
          {isCurrentUser ? <Button variant="outlined" onClick={() => setOpen(true)} > Edit Profile </Button> : <Button variant="outlined" > Follow</Button>}
        </div>
        <div className="p-5">
          <div className="">
            <h1 className="font-bold text-xl py-1">{userProfile?.firstName} </h1>
            <p>@{userProfile?.lastName}</p>
          </div>
          <div className="flex gap-5 items-center py-3 ">
            <span>41 post</span>
            <span>35 followers</span>
            <span>5 following</span>
          </div>
          <div className="">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, magnam.</p>
          </div>
        </div>
        <section>
          <Box  sx={{ width: '100%', borderBottom:1, borderColor:"divider" }}  >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >

              {tabs.map((tab) => (<Tab value={tab.value} label={tab.label} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="">
            {value=="post" && <div>
              {Array(3).map(()=>(<PostCard img={""} text={""}/>))}
              </div>}
          </div>
        </section>
      </div>
      <ProfileModal open={open} handleClose={handleClose} />


    </Card>
  )
}

export default Profile