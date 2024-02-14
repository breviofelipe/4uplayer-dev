import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.id);
  const isLiked = likes ? Boolean(likes[loggedInUserId]) : false;
  const likeCount = Object.keys(likes ? likes : []).length;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const url = process.env.REACT_APP_HOST_POSTS;
  const medium = palette.neutral.medium;
  
  const role = useSelector((state) => state.user.role);

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

  return (
    <div><WidgetWrapper mobile={!isNonMobileScreens}>
    <Friend
      friendId={postUserId}
      name={name}
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
         {comments && <Typography>{comments.length}</Typography>}
        </FlexBetween>
      </FlexBetween>

      <FlexBetween>
      <IconButton>
        <ShareOutlined />
      </IconButton>
      {role === 'ADMIN' && <>
      <IconButton onClick={deletePost}>
        <DeleteIcon />
      </IconButton>
      </> }
      </FlexBetween>
    </FlexBetween>
    {isComments && (
      <Box mt="0.5rem">
        {comments.map((comment, i) => (
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
            color: palette.background.alt,
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
