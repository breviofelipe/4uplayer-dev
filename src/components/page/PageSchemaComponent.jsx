import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";


const PageSchemaComponent = ({topContent, main, lastContent, alerUser}) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (<Box>
        <Navbar />
        {alerUser && alerUser }
        <Box
          width="100%"
          padding={isNonMobileScreens ? "2rem 6%" : undefined}
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>{topContent}</Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
          >
            {main}
          </Box>      
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {lastContent}
          </Box>
          
        </Box>
      </Box>
    )
}

export default PageSchemaComponent;