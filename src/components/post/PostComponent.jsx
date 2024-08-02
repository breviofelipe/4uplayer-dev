
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from 'components/FlexBetween';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import Icon4uPlayer from 'components/icons/Icon4uPlayer';

function PostComponent({ titulo, subtitulo, icon, content, msg, isCenter = true, msg1 }) {

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    
    return <Box minWidth={"345px"}>
        {!isNonMobileScreens && <Divider />}
        <WidgetWrapper mobile={!isNonMobileScreens}>
       <FlexBetween>
       <FlexBetween gap="1rem">
            {icon ? icon : <Icon4uPlayer />}
            <Box mb={"0.5rem"}>
                <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                    }}
                >
                    {titulo}
                </Typography>
                <Typography color={medium}>{subtitulo}</Typography>
            </Box>
        </FlexBetween>
        {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}
       </FlexBetween>
       {content && <div>
        {isCenter ? <Box mb={"1rem"} mt={"1rem"} width={"100%"} height={"auto"} minHeight={"200px"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} >
          {content}
       </Box> :
        <Box mt="1.5rem" display="flex" flexDirection="column" gap="1.5rem">
            {content}
        </Box>
       }
       </div>
       }
       <FlexBetween>
        <Box>{msg1}</Box><Box>{msg}</Box>
       </FlexBetween>
    </WidgetWrapper>
    {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider/>}
    </Box>;
}

export default PostComponent;