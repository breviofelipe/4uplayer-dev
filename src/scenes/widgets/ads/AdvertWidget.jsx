import { Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const medium = palette.neutral.medium;


  useEffect(() => {
    const scriptElement = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4527229097839562"]')
    const handleScriptLoad = () => {
      try{
        if(window.adsbygoogle){
          window.adsbygoogle.push({});
        } else {
          scriptElement.addEventListener("load", handleScriptLoad);
          console.log("waiting until adsense lib loaded")
        }
      } catch (err) {
        console.log("error in adsense", err);
      }
    }
    handleScriptLoad();
},[]);
  
  return (<WidgetWrapper mobile={!isNonMobileScreens}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Publicidade
        </Typography>
        <Typography color={medium}>4u Ads</Typography>
      </FlexBetween>
      <FlexBetween mb="1rem">
            <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src='https://res.cloudinary.com/dosghtja7/image/upload/v1729042356/assets/posts/tmpqvdqv6ss6usu5q7c5.webp'
              />    
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
