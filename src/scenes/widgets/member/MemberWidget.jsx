import { Box, Button, IconButton, Typography } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import { transferToken } from "../metamask/MetaMaskService";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import BasicModal from "components/modals/BasicModal";

const MemberWidget = () => {
    const addressPLCTeste = '0xe88666ed7aefcf7657f5c479164bd5b519f123ba';

    const content = () => {
        return <Box>
        <Typography variant="h4" >Nossos cofundadores terão acesso a benefícios vitalícios por apoiar o crescimento do projeto, como:</Typography>
            <Box marginTop={"0.5rem"} marginBottom={"0.5rem"} paddingLeft={"1rem"}>
                <Typography>
                - Título exclusivo
                </Typography>
                <Typography>
                    - Acesso a área de propostas e votação
                </Typography>
                <Typography>
                    - VIP vitalício na plataforma
                </Typography>
                <Typography>
                    - Participação nos lucros
                </Typography>
                <Typography>
                - Taxas de negociação
                </Typography>
            </Box>
            <Typography variant="h5">
                Tudo isso investindo pouco e se tornando parte da história.
            </Typography>
            <Typography variant="h5">
                São apenas 1000 vagas que terão participação em 10% do equity do projeto.
            </Typography>
            <Box marginTop={"0.5rem"} marginBottom={"0.5rem"}>
                <Typography fontWeight="500" variant="h5">
                    1º Lote – vendido 5/100 Investimento: 800k em PLC
                </Typography>
            </Box>
            <Box display={"flex"} mt={"1rem"} mb={"0.5rem"} justifyContent={"center"} width={"100%"}>
                <BasicModal />
            </Box>
        </Box>
    }


    return <PostComponent titulo={"Seja um cofundador"} subtitulo={"Faça parte da fundação, proponha melhorias. "} isCenter={false} content={content()} icon={<img width={"30px"} height={"30px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} />}/>
}

export default MemberWidget;