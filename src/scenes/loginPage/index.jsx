import { Box, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
import Form from "./Form";
// import WeatherApp from "components/weatherApp/WeatherApp";
import { useSelector } from "react-redux";
import Icon4uPlayer from "components/icons/Icon4uPlayer";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const translation = useSelector((state) => state.translation);
 
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
      >
        <Box p="1rem 6%" gap={"0.5rem"} justifyContent="center" display={"flex"} flexDirection={"row"}>
        <Icon4uPlayer />
        <Typography mt={"0.5rem"} fontWeight="bold" fontSize="32px" color="primary">
        {translation != null && translation.loginPage.title}
        </Typography>
        </Box>
      </Box>
      {/* <WeatherApp /> */}
      {!isNonMobileScreens && <Divider />}
      <Box
        width={isNonMobileScreens ? "50%" : "97%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          {translation != null && translation.loginPage.frase}
        </Typography>
        {translation != null && <Form translation={translation} />}
      </Box>
    </Box>
    
  );
};

export default LoginPage;
