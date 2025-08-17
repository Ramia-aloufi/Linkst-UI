import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/Store";
import { useEffect } from "react";
import { getPosts } from "../../redux/post/PostService";
import { GetUserProfile } from "../../redux/profile/ProfileService";

const HomeLayout = () => {

  const{ token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
      dispatch(GetUserProfile());
      dispatch(getPosts(0));
    }
  }, [dispatch, navigate, token]);




  return (
    <div className="h-screen px-12 space-y-4">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default HomeLayout