// src/InfiniteScroll.js

import GamerLoading from 'components/gamerLoading/GamerLoading';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostWidget from './PostWidget';
import { setPosts } from 'state';
import PostComponent from 'components/post/PostComponent';
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone';
import { fetchPosts, fetchPostsByUser } from './services';

const InfiniteScroll = ({ userId, isProfile = false, posts, token, dispatch }) => {

  const [isLast, setLast] = useState(false);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const [isLoading, setLoading] = useState(false);
  
  const loadMoreItems = useCallback(async () => {
    
    if(page > 0){
      fetchPosts(setLoading, token, page, dispatch, posts, setPosts, setLast);
    }
  }, [page, token]);

  const loadMoreItemsUserPosts = useCallback(async () => {
    fetchPostsByUser(setLoading, token, page, dispatch, posts, setPosts, setLast, userId);
  }, [page, token])

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

  if(posts.length == 0)
    return <PostComponent subtitulo={"Nenhum post por aqui..."} icon={<WysiwygTwoToneIcon fontSize="large" />} />
  else return (
    <div>
        {posts.map(({
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
        youtubeEmbedId, twitchEmbedId, reports
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
                reports={reports}
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
            reports={reports}
        /></div>;
          }
        })}
        {isLoading && <GamerLoading  />}
    </div>
  );
};

export default InfiniteScroll;
