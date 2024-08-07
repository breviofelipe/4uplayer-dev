import { useDispatch } from "react-redux";
import InfiniteScroll from "./InfiniteScroll";
import { useEffect } from "react";
import { setPosts } from "state";

const PostsWidget = ({ userId, isProfile = false }) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(isProfile){
      dispatch(setPosts({ posts: [] }));
    }
  },[])
  

  return <InfiniteScroll isProfile={isProfile} userId={userId} />;
};

export default PostsWidget;
