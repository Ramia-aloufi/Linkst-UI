import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/Store";
import { useEffect, useRef } from "react";
import { getPosts } from "../../redux/post/PostService";
import { getMe, getUsersStory } from "../../redux/user/UserService";

const HomeLayout = () => {

  const{ token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const firstFetch = useRef(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
      if (firstFetch.current) {
        firstFetch.current = false;
        dispatch(getMe());
        dispatch(getPosts(0));
        dispatch(getUsersStory());
      }
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