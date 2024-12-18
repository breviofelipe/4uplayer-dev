import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
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
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import LoadingComponent from "components/loading/Loading";
import "./MyPostWidget.css";
import { useNavigate } from "react-router-dom";
          

const MyPostWidget = ({ picturePath }) => {
  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();
  const url = process.env.REACT_APP_HOST_POSTS; 

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
          setScrollY(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  const style = {
      position: 'relative',
      top: `${scrollY}px`,
      zIndex: 100,
  };

  
  const getBase64FromUrl = (image) => {
  var reader = new FileReader();
   reader.readAsDataURL(image);
   reader.onload = async function () {
     picturePath = image.name;
      const body = {
        file: reader.result,
        userId: id,
        description: post,
        picturePath: picturePath
      }
      const response = await fetch(url+`/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
     if(response.ok){
        navigate(0);
     }
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
    };
  }
  
  const handlePost = async () => {
    setLoading(true);
    if (image) {
      getBase64FromUrl(image);    
    } else {
      const body = {
        file: '',
        userId: id,
        description: post,
        picturePath: ''
      }
      const response = await fetch(url+`/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if(response.ok){
        navigate(0);
     }
    }    
  };
  // style={style}
  return (<div >
    { loading ? <WidgetWrapper mobile={!isNonMobileScreens}><LoadingComponent /></WidgetWrapper> : <><WidgetWrapper mobile={!isNonMobileScreens}>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="O que tenho em mente..."
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
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            maxFiles={2}
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
                    <p>Selecionar imagem</p>
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
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Adicionar imagem
          </Typography>
        </FlexBetween>

       <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.neutral.dark,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
    </>
    }
  </div>
    
  );
};

export default MyPostWidget;
