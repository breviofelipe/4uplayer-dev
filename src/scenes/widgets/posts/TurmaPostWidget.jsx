import {
    FavoriteBorderOutlined,
    FavoriteOutlined
  } from "@mui/icons-material";
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPostPersonagem } from "state";
import YoutubeWidget from "./youtube/YoutubeWidget";
import DocumentoWidget from "./drive/DocumentoWidget";
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';  
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
  const TurmaPostWidget = ({
    id,
    key,
    userId,
    turmaId,
    description,
    picturePath,
    youtubeEmbedId,
    driveEmbedId,
    userPicturePath,
    createdAt,
    likes,
    userName
}) => {
    
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user.id);
    const isLiked = likes ? Boolean(likes[loggedInUserId]) : false;
    const likeCount = Object.keys(likes ? likes : []).length;
    const turma = useSelector((state) => state.turma);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;
    const role = useSelector((state) => state.user.role);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    
    const url = process.env.REACT_APP_HOST_ARCANE;

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
      const response = await fetch(url+`/turmas/${id}/posts`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      navigate(0);
    }
  
    const patchLike = async () => {
      const response = await fetch(url+`/turmas/${id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      
      dispatch(setPostPersonagem({ post: updatedPost }));
      dispatch(setPost({ post: updatedPost }));
    };

    if( youtubeEmbedId ){
      return <>
          <YoutubeWidget id={id} loggedInUserId={loggedInUserId} embedId={youtubeEmbedId} picturePath={userPicturePath} description={description} subtitle={getFormatedDate(createdAt)} likes={likes} />
          {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
      </>
  } else if ( driveEmbedId ) {
      return <>
          <DocumentoWidget id={id} loggedInUserId={loggedInUserId} embedId={driveEmbedId} picturePath={userPicturePath} description={description} subtitle={getFormatedDate(createdAt)} likes={likes}/>
          {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
      </>
  }
  
  const getNamePost = () => {

    const nomePersonagem = turma.espetaculo.personagens.filter(personagem => personagem.id === turmaId);
    if(nomePersonagem.length > 0){
      return <Typography color={main} sx={{ ml: "0.5rem" }} >{nomePersonagem[0].nome}</Typography>
    } else {
      return <Typography color={main} sx={{ ml: "0.5rem" }}>{turma.turmaId}</Typography>
    }
  }
    return (
      <WidgetWrapper isMobile={!isNonMobileScreens} key={key}>
        <FlexBetween mb={"1rem"}>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="48px" />
                <Box>
                   
                {getNamePost()}

                    <Typography color={medium} fontSize="0.75rem" sx={{ ml: "0.5rem" }} >
                      {getFormatedDate(createdAt)}
                    {userName &&
                        <> by {userName}</>
                    }
                    </Typography>
                   
                </Box>
            </FlexBetween>
            {role === 'ADMIN' && <DeleteIcon onClick={deletePost} /> }
        </FlexBetween>
        {/* <UserImage image={userPicturePath} size="50px" /> */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
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
          </FlexBetween>
  
          { picturePath &&  <IconButton onClick={() => {
            saveAs(picturePath, userId+".png")
          }}>
            <DownloadIcon />
          </IconButton>
          }
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default TurmaPostWidget;
  