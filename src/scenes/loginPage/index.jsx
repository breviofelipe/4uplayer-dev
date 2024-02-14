import { Box, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
import Form from "./Form";
// import WeatherApp from "components/weatherApp/WeatherApp";
import { useSelector } from "react-redux";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const translation = useSelector((state) => state.translation);
 
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
        {translation != null && translation.loginPage.title}
        </Typography>
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
