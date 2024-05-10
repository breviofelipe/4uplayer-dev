import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Box, Divider, LinearProgress, Paper, Typography, useTheme, TabScrollButton, Tooltip } from '@mui/material';

import PostComponent from "components/post/PostComponent";
import { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import Mission from './Mission';
import GamerLoading from 'components/gamerLoading/GamerLoading';

const MissionsWidget = () => {

    const { id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const url = process.env.REACT_APP_HOST_USERS;
    const [isLoading, setLoading] =  useState(false);
  
    const [missions, setMissions] = useState([]);

    const getMissions = async () => {
        setLoading(true);
        await fetch(url+`/missions/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }).then(async (data) => {
            const user = await data.json();
            setMissions(user.missions);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        })
        .finally();
    }; 
    
    useEffect(() => {
        getMissions();
    }, [])

    const content = () => {
        return <>{missions.length > 0 && missions.map((mission) => {
                return <><Mission 
                id={mission.id}
                name={mission.name}
                description={mission.description}
                reward={mission.reward}
                completed={mission.completed}
                progress={mission.progress}
                steps={mission.steps}
                />
                </>
        })}
        <Box mb={"0.4rem"}></Box>
        </>
    }

    const msg = () => {
        return <Tooltip title="Conclua missões, ganhe PLCs e resgate quando quiser!">
            <InfoIcon fontSize='large' />
        </Tooltip>
    }
    
    return <>{ isLoading ? <GamerLoading /> : <PostComponent msg={msg()} titulo={"Missões"} subTitulo={"Complete missões e ganhe PLC"} icon={<TrackChangesIcon fontSize='large' />} content={content()} isCenter={false}/>}
    </>
}

export default MissionsWidget;