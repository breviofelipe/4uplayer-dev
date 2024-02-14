import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    ImageOutlined
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    TextField,
  } from "@mui/material";
  // import AddTaskIcon from '@mui/icons-material/AddTask';
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts, setPostsPersonagem } from "state";
  import YouTubeIcon from '@mui/icons-material/YouTube';
import LoadingComponent from "components/loading/Loading";
  const PostarTurmaWidget = ({ picturePath, personagemPost, turmaId}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [isYoutube, setIsYoutube] = useState(false);
    const [isDoc, setIsDoc] = useState(false);
    const [isTask, setIsTask] = useState(false);
    const [image, setImage] = useState(null);
    const [link, setLink] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // const turmaId = useSelector((state) => state.turma.id);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const [loading, setLoading] = useState(false);
    // const url = "http://localhost:5000";
    const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';

    const getBase64FromUrl = (image) => {
      var reader = new FileReader();
       reader.readAsDataURL(image);
       reader.onload = async function () {
          const body = {
            file: reader.result,
            userId: id,
            turmaId: personagemPost ? personagemPost : turmaId,
            description: post,
            link: ''
          }
          const response = await fetch(url+`/turmas/post`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          getPosts();
          setImage(null);
          setIsImage(!isImage);
       };
       reader.onerror = function (error) {
         console.log('Error: ', error);
        };
      }
      
      
    const handlePost = async () => {
      setLoading(true);
      if (image) {
        getBase64FromUrl(image);
      }
      else if (link) {
        const body = {
          file: '',
          userId: id,
          turmaId: personagemPost ? personagemPost : turmaId,
          description: post,
          link: link
        }
        const response = await fetch(url+`/turmas/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setLink(null)
        getPosts();
      } else {
        const body = {
          file: '',
          userId: id,
          turmaId: personagemPost ? personagemPost : turmaId,
          description: post,
          link: ''
        }
        const response = await fetch(url+`/turmas/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if(data.status){
          console.log("data teste"+ data.status);
        }
        getPosts();
      }
    };

    const getPosts = async () => {
      const response = await fetch(url+`/turmas/${personagemPost ? personagemPost : turmaId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if(personagemPost){
        dispatch(setPostsPersonagem({ postsPersonagem: data }));
      } else {
        dispatch(setPosts({ posts: data }));
      }
      setPost("");
      setIsYoutube(false);
      setIsDoc(false);
      setLoading(false);
    };

    const postImage = () => {

     return <Box
      border={`1px solid ${medium}`}
      borderRadius="5px"
      mt="1rem"
      p="1rem"
    >
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple={false}
        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <FlexBetween>
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              width="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!image ? (
                <p>Adicionar uma imagem</p>
              ) : (
                <FlexBetween>
                  <Typography>{image.name}</Typography>
                  <EditOutlined />
                </FlexBetween>
              )}
            </Box>
            {image && (
              <IconButton
                onClick={() => setImage(null)}
                sx={{ width: "15%" }}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </FlexBetween>
        )}
      </Dropzone>
    </Box>
    }

    const postLink = (texto) => {
      return <Box
      border={`1px solid ${medium}`}
      borderRadius="5px"
      mt="1rem"
      p="1rem"
    >
    
          <FlexBetween>
            <Box
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              width="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <TextField
                label={texto}
                onChange={(e) => setLink(e.target.value)}              
                />
          </Box>
          </FlexBetween>
    </Box>
    }

    const posts = () => {
      if(isImage){
        return postImage();
      } else if (isYoutube) {
        return postLink("Youtube link")
      } else if (isDoc) {
        return postLink("Drive link");
      }
      return <></>

    }

    const onClickLink = (typeLink) => {
      if ( typeLink === "DOC"){
        setIsDoc(!isDoc);
        setIsImage(false);
        setIsYoutube(false);
      } else if (typeLink === "YOUTUBE"){
        setIsYoutube(!isYoutube);
        setIsDoc(false);
        setIsImage(false);
      } else if (typeLink === "IMAGE"){
        setIsImage(!isImage);
        setIsDoc(false);
        setIsYoutube(false);
      }       
    }

    if(loading){
      return <WidgetWrapper isMobile={!isNonMobileScreens}><LoadingComponent /></WidgetWrapper>
    }
  
    return (
      <WidgetWrapper isMobile={!isNonMobileScreens}>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="Como posso colaborar..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {posts()}
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => onClickLink("IMAGE")}>
            <ImageOutlined sx={{ color: mediumMain }} />
            {isNonMobileScreens && <><Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Foto
            </Typography></>}
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem" onClick={() => onClickLink("YOUTUBE")}>
                <YouTubeIcon sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Youtube</Typography>
              </FlexBetween>
              <FlexBetween gap="0.25rem"  onClick={() => onClickLink("DOC")}>
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Documentos</Typography>
              </FlexBetween>
              {/* <FlexBetween gap="0.25rem">
                <AddTaskIcon sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Tarefas</Typography>
              </FlexBetween>  */}
            </>
          ) : (
            <>
            <FlexBetween gap="0.25rem" onClick={() => onClickLink("YOUTUBE")} >
            <YouTubeIcon sx={{ color: mediumMain }} />
            </FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => onClickLink("DOC")} >
              <AttachFileOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
            {/* <FlexBetween gap="0.25rem">
              <AddTaskIcon sx={{ color: mediumMain }} />
            </FlexBetween> */}
            </>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default PostarTurmaWidget;
  