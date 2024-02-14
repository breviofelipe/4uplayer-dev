import { useTheme } from "@emotion/react";
import "./GamerLoading.css";
import WidgetWrapper from "components/WidgetWrapper";
import { useMediaQuery } from "@mui/material";


const GamerLoading = () => {
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    
    return <WidgetWrapper mobile={!isNonMobileScreens}>

        <div className="container-ring">
            <div style={{
                color: palette.neutral.dark,
                textShadow: '0 0 10px' + palette.primary.main,
                }}  className="ring">Loading
                <span></span>
            </div>
        </div> 
    </WidgetWrapper>
    }

export default GamerLoading;