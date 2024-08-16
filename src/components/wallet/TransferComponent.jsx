import PostButton from "components/PostButton";
import { sendPLC } from "./service";
import WidgetWrapper from "components/WidgetWrapper";
import InputComponent from "components/InputComponent";
import { useState } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GamerLoading from "components/gamerLoading/GamerLoading"; 

const TransferComponent = ({token, toUserId, isNonMobile = true}) => {

    const [value, setValue] = useState();
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const component = () => {
        return <WidgetWrapper mobile={!isNonMobile}>
        <Typography variant="h5" fontWeight="500">Enviar PLCs</Typography>
        <Box flexDirection={"column"} display={"flex"}>
        { error && <Alert onClose={() => {
          setError(null);
        }}  severity="warning">{error}</Alert> }
            <InputComponent placeholder={'quantidade'} value={value} setValue={setValue} />
            <PostButton disabled={!value} text={'ENVIAR'} onClick={async () => {
               setLoading(true);
               var response = await sendPLC(token, toUserId, value);
               setLoading(false);
               if(response === "OK"){
                  navigate(0);
               } else {
                setError(response);
               }    
            }} />
        </Box>
    </WidgetWrapper>
    
    }
return <>{isLoading ? <GamerLoading /> : <>{component()}</>}</>
}

export default TransferComponent;