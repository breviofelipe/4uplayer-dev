// src/InfiniteScroll.js

import GamerLoading from 'components/gamerLoading/GamerLoading';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostWidget from './PostWidget';
import { setPosts } from 'state';

const InfiniteScroll = () => {
  var posts = useSelector((state) => state.posts);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const [isLoading, setLoading] = useState(false);
  const urlEnv = process.env.REACT_APP_HOST_POSTS;
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const loadMoreItems = async () => {
    // Simulando uma chamada de API para buscar mais itens
    // const newItems = await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`));
    //   }, 1000);
    // });


  
    setLoading(true);
    // await delay(5000);
    const response = await fetch(urlEnv+`/posts?page=${page}&sizePerPage=5&sortDirection=DESC`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    var newItems = data.content;
    setLoading(false);

    setItems(prevItems => [...prevItems, ...newItems]);
    dispatch(setPosts({ posts: items }));
  };

  useEffect(() => {
    loadMoreItems();
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
