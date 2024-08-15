import PostButton from "components/PostButton";
import { sendPLC } from "./service";
import WidgetWrapper from "components/WidgetWrapper";
import InputComponent from "components/InputComponent";
import { useState } from "react";
import FlexBetween from "components/FlexBetween";
import { Box, Divider, Typography } from "@mui/material";

const TransferComponent = ({token, isNonMobile = true}) => {

    const [value, setValue] = useState();

    return <>
    <WidgetWrapper mobile={!isNonMobile}>
        <Typography variant="h5" fontWeight="500">Enviar PLCs</Typography>
        <Box flexDirection={"column"} display={"flex"}>
            <InputComponent placeholder={'quantidade'} value={value} setValue={setValue} />
            <PostButton text={'ENVIAR'} onClick={() => sendPLC(token, "6573b6d9b6269e05054f1186")} />
        </Box>
        {!isNonMobile && <Divider />}
    </WidgetWrapper>
    {isNonMobile && <Box m="2rem 0" />}
    </>

}

export default TransferComponent;