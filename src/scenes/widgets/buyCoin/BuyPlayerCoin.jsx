import { useEffect, useState } from 'react';
import PostComponent from 'components/post/PostComponent';
import { Box, Typography, useTheme } from '@mui/material';
import GamerLoading from 'components/gamerLoading/GamerLoading';
import { useNavigate } from "react-router-dom";

import FlexBetween from 'components/FlexBetween';

import Checkout from 'components/mercadoPago/Checkout';
import Product from 'components/Product';
import { CheckCircle } from '@mui/icons-material';
const ethers = require("ethers");

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
        const props =  {
            id: '6612f662fdff533870915c9c',
            imageUrl: 'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png',
            name: "4K",
            description: "4.000 unidades de PLC",
            price: 3.69,
            onClick
            };
        const props1 =  {
            id: '6612f662fdff533870915c9d',
            imageUrl: 'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png',
            name: "100K",
            description: "100.000 unidades de PLC",
            price: 99.95,
            onClick
            };
        const props2 =  {
            id: '6612f663fdff533870915c9e',
            imageUrl: 'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png',
            name: "1M",
            description: "1.000.000 unidades de PLC",
            price: 999.95,
            onClick
            };
        if(!comprar){
            return <Box display={'flex'} justifyContent={"space-between"} flex={"column"}>
                    <Product {...props} />
                    <Product {...props1} />
                    <Product {...props2} />
                </Box>
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