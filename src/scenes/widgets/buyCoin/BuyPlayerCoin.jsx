import { useEffect, useState } from 'react';
import PostComponent from 'components/post/PostComponent';
import { Box, Typography, useTheme } from '@mui/material';
import GamerLoading from 'components/gamerLoading/GamerLoading';
import { useNavigate } from "react-router-dom";

import FlexBetween from 'components/FlexBetween';

import Checkout from 'components/mercadoPago/Checkout';
import { CheckCircle } from '@mui/icons-material';
import Products from './Products';

const BuyPlayerCoin = () => {

    const navigate = useNavigate();
    
   
    const [comprar, setComprar] = useState(false);
    const [response, setResponse] = useState();
    const [product, setProduct] = useState(0);
    
    const [isLoading, setLoading] = useState(false);

    const [mainContent, setMainContent] = useState();
    
    
    const titulo = "PlayerCoin";
    const subtitulo = "Compre pacotes da Cripto dos Gamers";

   

    function onClick(product){
        setProduct(product);
        setComprar(true);
    }
   
    const content = () => {
        if(!comprar){
            return <Products onClick={onClick} />                 
        } else {
            return <Box>
                <Checkout product={product} setResponse={setResponse} />
                <FlexBetween>
                    <Box></Box>
                    <Typography variant='h5'
                        fontWeight="500"
                    >Total da compra: R$ {product.price}
                    </Typography>
                </FlexBetween>
            </Box>
        }
    }

    const checkIcon = () => {
        
        return <Box>
            <CheckCircle fontSize='large' />
            <Typography>Pagamento em processamento, logo você recebera uma notifição.</Typography>
        </Box>
    }

    

    useEffect(() => {
        setMainContent(content());
    }, [comprar]);

    useEffect(() => {
        if(response){
            setMainContent(checkIcon);
            setTimeout(() => {
                setComprar(false)
                navigate(0);
            }, 15000)
        }
    }, [response])

    return <>{ isLoading ? <GamerLoading /> :
            <PostComponent isCenter={response ? true : false} titulo={titulo} subtitulo={subtitulo} content={mainContent} />}
        </>
}

export default BuyPlayerCoin;