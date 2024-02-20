import { useEffect, useState } from 'react';
import "./Metamask.css";
import PostComponent from 'components/post/PostComponent';
import { Box, Button, IconButton, InputBase, Typography, useTheme } from '@mui/material';
import { getTokenBalance, transferToken, addPlc } from './MetaMaskService';
import GamerLoading from 'components/gamerLoading/GamerLoading';
import AddIcon from '@mui/icons-material/Add';
import { Refresh } from '@mui/icons-material';

const ethers = require("ethers");

const MetaMaskWidget = () => {

    const { palette } = useTheme();
    const main = palette.neutral.main;

    const [myAddress, setMyAddress] = useState("");
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [toAddress, setToAddress] = useState("0xa4df0666852d5cD6E43bC4c5de795b3B79750a37");
    const [mainContent, setMainContent] = useState();
    
    const titulo = "MetaMask";
    const subtitulo ="Connect sua wallet MetaMask";
    const addressPLC = "0x8c888e9187DE82c5AACcD9e9acDE6B3D15f4f906";
    const addressPLCTeste = '0xe88666ed7aefcf7657f5c479164bd5b519f123ba';
    const ethereum = useState(window.ethereum);

    const [success, setSuccess] = useState();


    
    async function connect() {
        
        await window.ethereum.send('eth_requestAccounts'); 

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setMyAddress(address);
        const balance = await provider.getBalance(address);
        
        setBalance(ethers.utils.formatEther(balance.toString()));
        
        const amountPlc = await getTokenBalance(address, addressPLCTeste); 
        setMessage(amountPlc);
    }

    const metaIcon = () => {
        return <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1706018498/assets/icons/afgfgiydtoavziwblrac.svg" alt="metamask icon" />
    }

    const checkIcon = () => {
        
        return <img className="checkAnimated" src="https://res.cloudinary.com/dosghtja7/image/upload/v1706924996/assets/icons/h3zl9kfnc2zcfxjlcawc.png" alt="check icon" />
    }

    const transferPLC = async () => {
                        
        setLoading(true);  
        const tx = await transferToken(toAddress, addressPLCTeste, transferAmount);
        console.log(tx);
        setLoading(false);             
        if(tx.data){
            setSuccess(true)
            setTimeout(() => {
                setTransferAmount()
            }, 4000)
        }     
    }

    //0xa4df0666852d5cD6E43bC4c5de795b3B79750a37
    const content = () => {
        return <Box>            
            {myAddress ? <><Typography>{myAddress}</Typography></> : 
                <><Button onClick={evt => connect()} >Conectar</Button>
                </>
            }
            {myAddress &&
                <div>
                    <Typography>BNB: {balance}</Typography>    
                    <Typography>PLC: {message}</Typography>
                    
                    <InputBase
                        placeholder="Enviar PLC para..."
                        onChange={(e) => setToAddress(e.target.value)}
                        value={toAddress}
                        sx={{ borderRadius: "3rem", color: main, backgroundColor: palette.neutral.light, m: "0.5rem 0", pl: "1rem", width: "100%", }}
                        />
                    <InputBase
                        placeholder="Quantidade"
                        onChange={(e) => setTransferAmount(e.target.value)}
                        value={transferAmount}
                        sx={{ borderRadius: "3rem", color: main, backgroundColor: palette.neutral.light, m: "0.5rem 0", pl: "1rem", width: "100%", }}
                        />
                    <Button onClick={() => transferPLC() } >Enviar</Button>
                    
                </div>
            }
            </Box>
    }

    const linkMetamask = () => {
        return <Button onClick={evt => {
            var url = 'https://metamask.io/download/';
            window.open(url, '_blank', 'noreferrer');
        }} >Instalar</Button>
    }

    

    useEffect(() => {
        setMainContent(content());
    }, [myAddress, balance, message, toAddress, transferAmount]);

    useEffect(() => {
        if(success){
           setMainContent(checkIcon())
        }
    }, [success])

    if (ethereum[0] === undefined){
        return <PostComponent titulo={titulo} subtitulo={subtitulo} content={linkMetamask()} icon={metaIcon()} />
    }

    const msg = () => {
        return <><IconButton onClick={evt => addPlc()} ><img width={"30px"} height={"30px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} /><AddIcon />{metaIcon()}</IconButton></>
    }

    return <>{ isLoading ? <GamerLoading /> :
            <PostComponent titulo={titulo} subtitulo={subtitulo} content={mainContent} icon={metaIcon()} msg={msg()} msg1={myAddress && <IconButton onClick={() => connect()}>
            <Refresh />
        </IconButton>} />}
        </>
}

export default MetaMaskWidget;