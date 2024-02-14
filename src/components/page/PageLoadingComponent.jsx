
import { Skeleton } from "@mui/material";
import PageSchemaComponent from "./PageSchemaComponent";

const PageLoadingComponent = () => {
    const { innerHeight: height } = window;
    return <PageSchemaComponent topContent={<Skeleton variant="rounded" animation="wave" width={"100%"} height={height * 0.8}/>} main={<Skeleton variant="rounded" animation="wave" width={"100%"} height={height* 0.8}/>} lastContent={<Skeleton variant="rounded" animation="wave" width={"100%"} height={height* 0.8}/>}/>;
}

export default PageLoadingComponent;