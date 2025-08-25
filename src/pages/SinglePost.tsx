import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/Store";
import { useParams } from "react-router-dom";
import type { UUID } from "crypto";
import { getPostById } from "../redux/post/PostService";
import PostCard from "../components/home/PostCard";

const SinglePost = () => {
    const { postId } = useParams<{ postId: UUID }>();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePost } = useSelector((state: RootState) => state.post);
  
  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [dispatch, postId]);

  return (
    <>
      {singlePost && 
      <PostCard
        post={singlePost}
      />
      }
    </>
  )
}

export default SinglePost