import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "./InfiniteScroll";
import { useEffect, useState } from "react";
import { setPosts } from "state";
import { fetchPosts } from "./services";
import GamerLoading from "components/gamerLoading/GamerLoading";

const PostsWidget = ({ userId, isProfile = false }) => {
  
  const dispatch = useDispatch();  
  const [isLoading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const posts =  useSelector((state) => state.posts);

  useEffect(() => {
    
    dispatch(setPosts({ posts: [] }));  
    fetchPosts(setLoading, token, 0, dispatch, posts, setPosts, () => {});
    
  }, [])
  return <>{!isLoading ? <InfiniteScroll isProfile={isProfile} userId={userId} posts={posts} token={token} dispatch={dispatch} /> : <GamerLoading />}</>
};

export default PostsWidget;
