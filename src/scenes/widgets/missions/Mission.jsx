import { Box, Divider, LinearProgress, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
const Mission = ({id, progress, completed, name, description, reward, steps}) => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    
    const [progress2, setProgress2] = useState(progress);
    return<Box id={id}>
        <Box mb={'0.5rem'}>
                    <FlexBetween mb={"0.2rem"}>
                        <Box mt={"0.4rem"}>
                            <Typography variant="h5"
                            color={dark}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}>{name}</Typography>
                            <Typography
                            color={medium}
                            >{description}</Typography>
                        </Box>
                        {completed && <CheckIcon color='success' />}
                    </FlexBetween>
                    <LinearProgress color="success" variant="determinate" value={progress2} />
                    {!completed && <FlexBetween>
                        <Box></Box><Box><Typography
                            color={medium}
                            >Prêmio: {reward} PLC</Typography></Box>
                    </FlexBetween>}
                </Box>
                <Divider />
        </Box>
}

export default Mission;