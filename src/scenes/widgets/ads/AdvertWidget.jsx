import { CardActionArea, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import GamerLoading from "components/gamerLoading/GamerLoading";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const medium = palette.neutral.medium;  
  const url = process.env.REACT_APP_HOST_POSTS;
  const token = useSelector((state) => state.token);
  const [ads, setAds] = useState();
  
  const [isLoading, setLoading] = useState(true);

  const fetchAds = async () => {
    const response = await fetch(
      url+'/ads'
      ,{
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

     if(response.ok){
        const data = await response.json();

        let filter = data.filter((ad) => ad.adsPosition === 'RIGHT_AD');
        setAds(filter[filter.length - 1]);
        
     } 
     setLoading(false);
  }

  const patchClickAd = async () => {
    const response = await fetch(
      url+`/ads/click/${ads.id}`
      ,{
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

     if(!response.ok){
        console.log("error on server")
     }
     window.open("https://4uplayer.com", '_blank', 'noreferrer');
  }

  useEffect(() => {
      fetchAds();
  }, [])

  return (<WidgetWrapper mobile={!isNonMobileScreens}>
      {isLoading ? <GamerLoading /> : <><CardActionArea onClick={patchClickAd}>
        <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Publicidade
        </Typography>
        <Typography color={medium}>{ads.description}</Typography>
      </FlexBetween>
      <FlexBetween mb="1rem">
            <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={ads.urlImage}
              />    
      </FlexBetween>
        </CardActionArea></>}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
