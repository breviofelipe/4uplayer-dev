import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import GamerLoading from "components/gamerLoading/GamerLoading";

const urlEnv = process.env.REACT_APP_HOST_POSTS;

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [isLoading, setLoading] = useState(false);
 
  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(urlEnv+"/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      urlEnv+`/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    try {
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const postsComponente = () => {
    return posts.map(
      ({
        id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
        createdAt
      }) => (
        <PostWidget
          key={id}
          postId={id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
          createdAt={createdAt}
        />
      )
    )
  }

  return <>{isLoading ? <GamerLoading /> : postsComponente() }</>;
};

export default PostsWidget;
