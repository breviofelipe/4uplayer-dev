import InputComponent from "components/InputComponent"
import PageSchemaComponent from "components/page/PageSchemaComponent"
import PostComponent from "components/post/PostComponent"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AddIcon from '@mui/icons-material/Add';
import PostButton from "components/PostButton"
import FlexBetween from "components/FlexBetween"
import { Box, Typography, useTheme } from "@mui/material"
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import { FaTheaterMasks } from 'react-icons/fa';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CadastroTurmaPage = () => {
    const [value, setValue] = useState();
    const [espetaculo, setEspetaculo] = useState();
    const [atorShow, setAtorShow] = useState();
    const [personagemShow, setPersonagemShow] = useState();
    const [ator, setAtor] = useState();
    const [personagem, setPersonagem] = useState();
    const [personagensArray, setPersonagens] = useState([]);
    const [atoresArray, setAtores] = useState([]);
    const [nomeTurma, setNomeTurma] = useState();
    const [nomeEspetaculo, setNomeEspetaculo] = useState();
    const { id, picturePath } = useSelector((state) => state.user);
    const { palette } = useTheme();
    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
      };

    const save = () => {

        console.log("uhuuu")
    }

    const top = () => {
        const content = () => {


            return <div>{!nomeTurma ? <FlexBetween gap={"1rem"}>
            <InputComponent placeholder={"Qual será o nome da turma?"} value={value} setValue={setValue} />
            <PostButton text={"Criar"} onClick={() => {
                setNomeTurma(value);
            }} />
        </FlexBetween>
        :
        <>
        
            
        <Typography
        variant="h4"
        fontWeight="500"
        >{nomeTurma.toUpperCase()}</Typography>

        {!nomeEspetaculo  ? <FlexBetween gap={"1rem"}><InputComponent placeholder={"E qual será o espetáculo?"} value={espetaculo} setValue={setEspetaculo} />
            <PostButton text={"Criar"} onClick={() => {
                setNomeEspetaculo(espetaculo);
            }} /></FlexBetween> : <>
            <Typography color={palette.neutral.medium} >{nomeEspetaculo.toUpperCase()}</Typography>
            
            <FlexBetween mt={"2rem"} gap={"1rem"}>
           {!atorShow && <PostButton text={"+ atores"} onClick={() => {
                setAtorShow(true);
            }} />}
            {!personagemShow && <PostButton text={"+ personagens"} onClick={() => {
               setPersonagemShow(true);
            }} />}
            
            

            <Fab onClick={save} sx={fabStyle} aria-label={"Salvar"} color={'primary'}>
                    {<SaveIcon fontSize="large" />}
            </Fab>
           </FlexBetween>
           </>
            }

           
           
        </>    
    }</div>
        }
        return <PostComponent titulo={"Cadastro"} subtitulo={"Escolha o nome para do espetáculo"} content={content()}  icon={<AddIcon sx={{ fontSize: "36px" }} />} />
    }

    const addAtor = useCallback((ator) => {
        atoresArray.push(ator);
        console.log(atoresArray);
        setAtores(atoresArray);
        
    }, [])

    const addPersonagem = useCallback((ator) => {
        personagensArray.push(ator);
        console.log(personagensArray);
        setPersonagens(personagensArray);
        
    }, [])

    const main = () => {
        const content = () => {

            return <FlexBetween gap={"1rem"}>
                    <div>
                    {atoresArray.length > 0 && atoresArray.map((ator, index) => {
                        return <Box gap={"0.5rem"} mb={"0.5rem"} key={index} display={"flex"} flexDirection={"row"}>
                                    <AccountCircleIcon /><Typography>{ator.toUpperCase()}</Typography>
                                </Box>
                    })}
                    <FlexBetween gap={"1rem"}>
                        <InputComponent placeholder={"nome do ator ou atriz"} value={ator} setValue={setAtor} />
                    <PostButton text={<AddIcon sx={{ fontSize: "26px" }} />} onClick={() => {
                        addAtor(ator);
                        setAtor('');
                    }} /></FlexBetween>
                    </div>
                    </FlexBetween>
        }
    

        return <div>{atorShow && <PostComponent titulo={"Atores"} subtitulo={"Cadastrar lista de atores e atrizes"} content={content()}  icon={<AddIcon sx={{ fontSize: "36px" }} />} />}</div>
    }

    const last = () => {
       
        const content = () => {

            return <FlexBetween gap={"1rem"}>
                    <div>
                    {personagensArray.length > 0 && personagensArray.map((personagem, index) => {
                        return <Box gap={"0.5rem"} mb={"0.5rem"} key={index} display={"flex"} flexDirection={"row"}>
                           <FaTheaterMasks size={16} /><Typography>{personagem.toUpperCase()}</Typography>
                        </Box>
                    })}
                    <FlexBetween gap={"1rem"}><InputComponent placeholder={"nome do personagem"} value={personagem} setValue={setPersonagem} />
                    <PostButton text={<AddIcon sx={{ fontSize: "26px" }} />} onClick={() => {
                        addPersonagem(personagem);
                        setPersonagem('');
                    }} /></FlexBetween>
                    </div>
                    </FlexBetween>
        }
    

        return <div>{personagemShow 
            && <PostComponent 
            titulo={"Personagens"} 
            subtitulo={"Cadastrar lista de personagens"} 
            content={content()}  
            icon={<AddIcon sx={{ fontSize: "36px" }} />} />}
            </div>

    }

    return <PageSchemaComponent topContent={top()} main={main()} lastContent={last()} />
}

export default CadastroTurmaPage;