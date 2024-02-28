import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Box, Divider, LinearProgress, Paper, Typography, useTheme, TabScrollButton } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import PostComponent from "components/post/PostComponent";
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const MissionsWidget = () => {
    const [progress, setProgress] = useState(100);
    const [progress2, setProgress2] = useState(60);

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;

   

    const content = () => {
        const ITEM_HEIGHT = 48;
        return <Box>
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
                            }}>Ganhe sua primeira PLC</Typography>
                            <Typography
                            color={medium}
                            >Confirme seu e-mail</Typography>
                        </Box>
                        <CheckIcon color='success' />
                    </FlexBetween>
                    <LinearProgress color="success" variant="determinate" value={progress} />
                </Box>
                <Divider />
                <Box mb={'0.5rem'}>
                    <FlexBetween  mb={"0.2rem"}>
                        <Box mt={"0.4rem"}>
                            <Typography variant="h5"
                            color={dark}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}>Reuna seu Clan</Typography>
                            <Typography
                            color={medium}
                            >Convide 5 amigos</Typography>
                        </Box>
                        
                        {/* <CheckIcon color='success' /> */}
                    </FlexBetween>
                    <LinearProgress color="success" variant="determinate" value={progress2} />
                    <FlexBetween>
                        <Box></Box><Box><Typography
                            color={medium}
                            >Prêmio: 10 PLC</Typography></Box>
                    </FlexBetween>
                </Box>
                <Divider />
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
                            }}>A Grande Jornada</Typography>
                            <Typography
                            color={medium}
                            >Faça login 30 dias seguidos</Typography>
                        </Box>
                    </FlexBetween>
                    <LinearProgress color="success" variant="determinate" value={2} />
                    <FlexBetween>
                        <Box></Box><Box><Typography
                            color={medium}
                            >Prêmio: 100 PLC</Typography></Box>
                    </FlexBetween>
                </Box>
        </Box>
    }
    
    return <PostComponent titulo={"Missões"} subTitulo={"Complete missões e ganhe PLC"} icon={<TrackChangesIcon fontSize='large' />} content={content()} isCenter={false}/>
}

export default MissionsWidget;