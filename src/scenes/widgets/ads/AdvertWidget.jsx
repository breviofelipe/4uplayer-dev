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
        <Typography color={medium}>Google Ad</Typography>
      </FlexBetween>
      <FlexBetween>
      <ins className="adsbygoogle"
          data-full-width-responsive="true"
          style={{ width: "100%", height: "auto", minHeight: "250px"}}
          data-ad-client="ca-pub-4527229097839562"
          data-ad-slot="6609002383"
          data-ad-format="auto"
          ></ins>     
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
