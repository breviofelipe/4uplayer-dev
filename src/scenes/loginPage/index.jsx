import { Box, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
import Form from "./components/Form";
import "./login.css";
import { useSelector } from "react-redux";
import Icon4uPlayer from "components/icons/Icon4uPlayer";
import ImagemArtistas from "./components/ImagemArtistas";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const translation = useSelector((state) => state.translation);
 
  return (
    <Box m={"2rem"}>
      <Box
        width={"100%"}
        flexDirection={"row"}
        display={"flex"}
        height={"auto"}
        justifyContent="space-around"
        backgroundColor={theme.palette.background.alt}
      > 
        <Box
          width={"40%"}
          display={"flex"}
        >
          <ImagemArtistas src="https://res.cloudinary.com/dosghtja7/image/upload/v1721091247/assets/login/zifxnbfeg5dr3mjhzpma.png" />
        </Box>
        <Box
          width={"60%"}
          display={"flex"} >
          <Form translation={translation} />
        </Box>
      </Box>
    </Box>
    
  );
};

export default LoginPage;
