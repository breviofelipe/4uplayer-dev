// src/InfiniteScroll.js

import GamerLoading from 'components/gamerLoading/GamerLoading';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostWidget from './PostWidget';
import { setPosts } from 'state';
import PostComponent from 'components/post/PostComponent';
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone';

const InfiniteScroll = ({ userId, isProfile = false }) => {
  var posts =  useSelector((state) => state.posts);
  const [isLast, setLast] = useState(false);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const [isLoading, setLoading] = useState(false);
  const urlEnv = process.env.REACT_APP_HOST_POSTS;
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  
  const loadMoreItems = async () => {
    setLoading(true);

    const response = await fetch(urlEnv+`/posts?page=${page}&sizePerPage=3&sortDirection=DESC`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    var newItems = data.content;
    setLast(data.last);
    setLoading(false);
    if(!data.first){
        dispatch(setPosts({ posts: [...posts, ...newItems] }));
    } else {
        dispatch(setPosts({ posts: newItems }));
    }
  };

  const loadMoreItemsUserPosts = async () => {
    setLoading(true);
 
    const response = await fetch(
      urlEnv+`/posts/${userId}/posts?page=${page}&sizePerPage=3&sortDirection=DESC`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    try {
      const data = await response.json();
      var newItems = data.content;
      setLast(data.last);
      
      if(!data.first){
          dispatch(setPosts({ posts: [...posts, ...newItems] }));
      } else {
          dispatch(setPosts({ posts: newItems }));
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {    
    if(!isLast){
        if (isProfile) {
           loadMoreItemsUserPosts();
        } else {
           loadMoreItems();
        }
    }
  }, [page]);

  const lastItemRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  if(!posts)
    return <GamerLoading />
  if(posts.length == 0)
    return <PostComponent subtitulo={"Nenhum post por aqui..."} icon={<WysiwygTwoToneIcon fontSize="large" />} />
  return (
    <div>
        {posts != null && posts.map(({
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
        createdAt,
        youtubeEmbedId, twitchEmbedId
      }, index) => {
          if (posts.length === index + 1) {
            return (<div ref={lastItemRef} key={index}><PostWidget
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
                youtubeEmbedId={youtubeEmbedId}
                twitchEmbedId={twitchEmbedId}
                />
               </div>
            );
          } else {
            return <div key={index}><PostWidget
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
            youtubeEmbedId={youtubeEmbedId}
            twitchEmbedId={twitchEmbedId}
        /></div>;
          }
        })}
        {isLoading && <GamerLoading  />}
    </div>
  );
};

export default InfiniteScroll;
