import { Box, Button, Typography } from "@mui/material";
import "./index.css";

export default function Product(props) {
    const {id, imageUrl, name, description, price, onClick} = props

    return (
        <Box
            key={id}
            className={"product"}
        >
            <img
                src={imageUrl}
                alt={`Image of ${name}`}
                className={"image-product"}
            />
            <Typography variant="h4" >{name}</Typography>
            <Typography>{description}</Typography>
            <Typography>R$ {price}</Typography>
            <Box display={"flex"} justifyContent={"center"}>
                <Button onClick={() => onClick(props)}>
                    Comprar
                </Button>
            </Box>
        </Box>
    );
}