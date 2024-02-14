import { Box, Divider, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setPosts, setPostsPersonagem } from "state";
import TurmaPostWidget from "./TurmaPostWidget";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostComponent from "components/post/PostComponent";
import { FaTheaterMasks } from 'react-icons/fa';

const TurmaPostsWidget = ({ turmaId, personagemPost }) => {
    // const url = "http://localhost:5000";
    const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const postsPersonagem = useSelector((state) => state.postsPersonagem);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const getPosts = async () => {
        try {
          const response = await fetch(url+`/turmas/${turmaId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if(!personagemPost){
            dispatch(setPosts({ posts: data }));
          } else {
            dispatch(setPostsPersonagem({ postsPersonagem: data }));
          }
        } catch (err) {
          console.log(err);
          dispatch(setLogout());
          navigate('/');
        }
      };

    useEffect(() => {        
        getPosts();       
      }, [turmaId]); // eslint-disable-line react-hooks/exhaustive-deps

    const typePost = () => {
      if(!personagemPost) {
        return Array.isArray(posts) && posts.length > 0 ? posts.map(({
          id,
          userId,
          turmaId,
          description,
          picturePath,
          youtubeEmbedId,
          driveEmbedId,
          userPicturePath,
          createdAt,
          likes
      }) => {
          return <><TurmaPostWidget
                      key={turmaId}
                      id={id}
                      turmaId={turmaId}
                      userId={userId}
                      description={description}
                      picturePath={picturePath}
                      createdAt={createdAt}
                      driveEmbedId={driveEmbedId}
                      likes={likes}
                      userPicturePath={userPicturePath}
                      youtubeEmbedId={youtubeEmbedId} />
                  {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}</>
          
      })
      : <PostComponent subtitulo={"Sem posts"} icon={<FaTheaterMasks size={36} />} />
      } else {
        return Array.isArray(postsPersonagem) && postsPersonagem.length > 0 ? postsPersonagem.map(({
          id,
          userId,
          userName,
          turmaId,
          description,
          picturePath,
          youtubeEmbedId,
          driveEmbedId,
          userPicturePath,
          createdAt,
          likes
      }) => {
          return <><TurmaPostWidget
                      key={turmaId}
                      id={id}
                      turmaId={turmaId}
                      userId={userId}
                      description={description}
                      picturePath={picturePath}
                      createdAt={createdAt}
                      driveEmbedId={driveEmbedId}
                      likes={likes}
                      userPicturePath={userPicturePath}
                      youtubeEmbedId={youtubeEmbedId}
                      userName={userName}
                      />
                  {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}
                  </>
          
      })
      : <PostComponent subtitulo={"Sem posts"} icon={<FaTheaterMasks size={36} />} />
      }
    }
      
    return (typePost());

}

export default TurmaPostsWidget;