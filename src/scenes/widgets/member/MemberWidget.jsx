import { Box, Button, IconButton, Typography } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import { transferToken } from "../metamask/MetaMaskService";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

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
                    - Investimento em Eventos na plataforma
                </Typography>
                <Typography>
                - Taxas de negociação
                </Typography>
            </Box>
            <Typography variant="h4">
                Tudo isso investindo pouco e se tornando parte da história.
            </Typography>
            <Box display={"flex"} mt={"1rem"} mb={"0.5rem"} justifyContent={"center"} width={"100%"}>
                <Button onClick={() => {
                    transferToken(addressPLCTeste, addressPLCTeste, '2')
                }}
                >   <Typography mt={"0.3rem"} marginRight={"0.5rem"} variant="h3">COMPRAR</Typography>
                    <img width={"25px"} height={"25px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} />
                </Button>
            </Box>
        </Box>
    }


    return <PostComponent titulo={"Seja um cofundador"} subtitulo={"Faça parte da fundação, proponha melhorias. "} isCenter={false} content={content()} icon={<img width={"30px"} height={"30px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} />}/>
}

export default MemberWidget;