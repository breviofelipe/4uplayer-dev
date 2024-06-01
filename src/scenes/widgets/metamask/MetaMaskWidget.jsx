import { useEffect, useState } from 'react';
import "./Metamask.css";
import PostComponent from 'components/post/PostComponent';
import { Box, Button, IconButton, InputBase, Tooltip, Typography, useTheme } from '@mui/material';
import { getTokenBalance, transferToken, addPlc, AddNetwork } from './MetaMaskService';
import GamerLoading from 'components/gamerLoading/GamerLoading';
import AddIcon from '@mui/icons-material/Add';
import { Refresh } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMetamaskAddress } from 'state';
import FlexBetween from 'components/FlexBetween';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Icon4uPlayer from 'components/icons/Icon4uPlayer';
const ethers = require("ethers");

const MetaMaskWidget = () => {

    const { palette } = useTheme();
    const main = palette.neutral.main;

    const metamaskAddress = useSelector((state) => state.metamaskAddress);
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [toAddress, setToAddress] = useState();
    const [mainContent, setMainContent] = useState();
    
    const titulo = "MetaMask";
    const subtitulo = "Connect sua wallet MetaMask";
    
    const ethereum = useState(window.ethereum);

    const [success, setSuccess] = useState();
   
    const dispatch = useDispatch();

    

    
    async function connect() {
        
       try {
        if (window.ethereum)
            console.log(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            dispatch(setMetamaskAddress({'metamaskAddress' : address}))
            const balance = await provider.getBalance(address);
            
            setBalance(ethers.formatEther(balance.toString()));
            
            const amountPlc = await getTokenBalance(address); 
            setMessage(amountPlc);
       } catch (err) {
            console.log(err);
       }
    }

    const refresh = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const signer = provider.getSigner();
            const address = await signer.getAddress();
            dispatch(setMetamaskAddress({'metamaskAddress' : address}))
            const balance = await provider.getBalance(address);
            
            setBalance(ethers.utils.formatEther(balance.toString()));
            
            const amountPlc = await getTokenBalance(address); 
            setMessage(amountPlc);
        } catch (err){
            console.log(err);
        }

    }

    const metaIcon = () => {
        return <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1706018498/assets/icons/afgfgiydtoavziwblrac.svg" alt="metamask icon" />
    }

    const checkIcon = () => {
        
        return <img className="checkAnimated" src="https://res.cloudinary.com/dosghtja7/image/upload/v1706924996/assets/icons/h3zl9kfnc2zcfxjlcawc.png" alt="check icon" />
    }

    const transferPLC = async () => {
                        
        setLoading(true);  
        const tx = await transferToken(toAddress, transferAmount);
        console.log(tx);
        setLoading(false);             
        if(tx.data){
            setSuccess(true)
            setTimeout(() => {
                setTransferAmount()
            }, 4000)
        }     
    }

    const content = () => {
        return <Box>            
            {metamaskAddress ? <><Typography>{metamaskAddress}</Typography></> : 
                <><Button onClick={evt => connect()} >Conectar</Button>
                </>
            }
            {metamaskAddress &&
                <div>
                    
                       
                    <FlexBetween>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100%"}>
                            <Typography>BNB: {balance}</Typography> 
                            <Typography>PLC: {message}</Typography>
                        </Box>
                        <IconButton onClick={() => connect()}>
                            <Refresh />
                        </IconButton>
                    </FlexBetween>
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
    }, [metamaskAddress, balance, message, toAddress, transferAmount]);

    useEffect(() => {
        if(success){
           setMainContent(checkIcon())
        }
    }, [success])

    useEffect(() => {        
        if(metamaskAddress){
            refresh();
        }     
    }, []);

    if (ethereum[0] === undefined){
        return <PostComponent titulo={titulo} subtitulo={subtitulo} content={linkMetamask()} icon={metaIcon()} />
    }

    const msg = () => {
        return <>
        <Tooltip title="Add PLC Metamask">
            <IconButton onClick={evt => addPlc()} ><Icon4uPlayer /><AddIcon />{metaIcon()}</IconButton>
        </Tooltip>
        </>
    }

    return <>{ isLoading ? <GamerLoading /> :
            <PostComponent titulo={titulo} subtitulo={subtitulo} content={mainContent} icon={metaIcon()} msg={msg()} msg1={metamaskAddress && 
            <>
             <Tooltip title="Add Network Metamask">
                <IconButton  onClick={AddNetwork}><ViewInArIcon fontSize='large'/><AddIcon />{metaIcon()}</IconButton>
            </Tooltip>
            
        </>
    } />}
        </>
}

export default MetaMaskWidget;