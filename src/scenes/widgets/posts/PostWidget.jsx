import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from "@mui/icons-material";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage";
import YoutubeEmbed from "components/youtube/YoutubeEmbed";
import TwitchEmbed from "components/twitch/TwitchEmbed";

const PostWidget = ({
  post
}) => {
  const {
  postId,
  userId,
  name,
  firstName,
  lastName,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  commentsObject,
  createdAt,
  youtubeEmbedId,
  twitchEmbedId,
  reports,
  counterLikes,
  counterComments,
  liked
  } = post;
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.id);
  const loggedInUserEmail = useSelector((state) => state.user.email);
  const isLiked = liked;
  const isReported = reports ? reports.includes(loggedInUserEmail) : false;
  const likeCount = counterLikes;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const url = process.env.REACT_APP_HOST_POSTS;
  const medium = palette.neutral.medium;
  
  const role = useSelector((state) => state.user.role);
  const myPost = useSelector((state) => state.user.id) === userId; 
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState("");

  const getFormatedDate = (str) => {
    try {
     let currentDate = format(new Date(str), 'dd MMMM yyyy, HH:mm',  { locale: ptBR });
     return currentDate;
    } catch ( err ){
       console.log(err);
       return '';
     }
   }


   const deletePost = async () => {
    const response = await fetch(url+`/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    dispatch(setPosts({ posts: null }));
    navigate(0);
  }

  const patchLike = async () => {
    const response = await fetch(url+`/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchReport = async () => {
    const response = await fetch(url+`/posts/${postId}/report`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, "Content-Type": "application/json",
      }
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleComment = async () => {
    const response = await fetch(url+`/posts/${postId}/comment?userId=${loggedInUserId}&comment=${newComment}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment('');
  }

  if(isReported){
    return <><WidgetWrapper mobile={!isNonMobileScreens}>
              <Friend
                friendId={userId}
                name={firstName + " "+ lastName}
                subtitle={createdAt && getFormatedDate(createdAt)}
                userPicturePath={userPicturePath}
              />
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src='https://res.cloudinary.com/dosghtja7/image/upload/v1729041958/assets/posts/x5o3ykvq7gury4l1ciz2.webp'
              />
          </WidgetWrapper>
          {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}</>
  }
 


  return (
    <div>
      <WidgetWrapper mobile={!isNonMobileScreens}>
    <Friend
      friendId={userId}
      name={firstName + " "+ lastName}
      subtitle={location}
      userPicturePath={userPicturePath}
    />
    
    
    <Typography color={main} sx={{ mt: "1rem" }}>
      {description}
    </Typography>
    <Typography color={medium} fontSize="0.75rem">
      {createdAt && getFormatedDate(createdAt)}
    </Typography>     
    {picturePath && (
      <img
        width="100%"
        height="auto"
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={ picturePath }
      />
    )}
    {youtubeEmbedId && <YoutubeEmbed embedId={youtubeEmbedId} />}
    {twitchEmbedId && <TwitchEmbed embedId={twitchEmbedId} />}
    <FlexBetween mt="0.25rem">
      <FlexBetween gap="1rem">
        <FlexBetween gap="0.3rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
         {commentsObject && <Typography>{counterComments}</Typography>}
        </FlexBetween>
      </FlexBetween>

      <FlexBetween>
      {!myPost && <IconButton onClick={patchReport}>
        <ReportGmailerrorredOutlinedIcon sx={{ color: 'red' }}/>
      </IconButton>}
      {role === 'ADMIN' && <>
      <IconButton onClick={deletePost}>
        <DeleteIcon />
      </IconButton>
      </> }
      </FlexBetween>
    </FlexBetween>
    {isComments && (
      <Box mt="0.5rem">
        {commentsObject.map((comment, i) => (
          <Box key={`${name}-${i}`}>
            <Divider />          
              <Box sx={{ m: "0.5rem 0", flexDirection: "column", display: "flex" }}>
                <FlexBetween gap={"0.5rem"}>
                  <UserImage image={comment.urlPicturePath} size="24px"/>
                  <Typography sx={{ color: main, width: "100%" }}>
                      {comment.firstName} {comment.lastName}
                      <Typography color={medium} fontSize="0.75rem">
                        { getFormatedDate(comment.createdAt) }
                      </Typography>
                  </Typography>
                </FlexBetween>
                <Typography sx={{pl: "2rem", color: main, width: "100%" }}>
                      {comment.comment}
                </Typography>
              </Box>
          </Box>
        ))}
        <Divider />
        <FlexBetween gap={"0.5rem"}>
        <InputBase
          placeholder="Deixe seu comentário..."
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          sx={{ borderRadius: "3rem", color: main, backgroundColor: palette.neutral.light, m: "0.5rem 0", pl: "1rem", width: "100%", }}
        />
        <Button
          disabled={!newComment}
          onClick={handleComment}
          sx={{
            color: palette.neutral.dark,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Comentar
        </Button>
        </FlexBetween>
      </Box>
    )}
  </WidgetWrapper>
  {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}</div>
  );
};

export default PostWidget;
