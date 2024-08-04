import InfiniteScroll from "./InfiniteScroll";

const urlEnv = process.env.REACT_APP_HOST_POSTS;

const PostsWidget = ({ userId, isProfile = false }) => {
  
  return <InfiniteScroll isProfile={isProfile} userId={userId} />;
};

export default PostsWidget;
