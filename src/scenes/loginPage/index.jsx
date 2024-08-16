import { Box, useMediaQuery } from "@mui/material";
import Form from "./components/Form";
import "./login.css";

import ImagemArtistas from "./components/ImagemArtistas";


const LoginPage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const translation = {loginPage: {
    title: "4UPLAYER",
    frase: "Ingresse e seja parte da maior aventura entre mundos, personagens e magia",
    fraseFormCriar: "criar uma conta",
    fraseFormEntrar: "Já tem uma conta? Entre aqui.",
    fraseRequired: "Obrigatório",
    fraseEmail: "Email inválido!",
    warningLogin: "Usuário ou senha inválido!",
    sucessRegister: "Usuário criado com sucesso!",
    error: "Falha - Tente novamente mais tarde",
    addPic: "Adicione uma foto aqui",
    formEmail: "E-mail ou nome de usuário",
    formPassword: "Senha",
    formName: "Nome",
    formLastName: "Sobrenome",
    formClan: "Clan",
    formNickname: "Nickname",
    formLogin: "Entrar",
    formRegister: "Cadastrar"
  }
};
  
  // useSelector((state) => state.translation);
 
  return (
    <Box>
      <Box
        width={"100%"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
        display={"flex"}
        height={"auto"}
        justifyContent="space-around"
      > 
        <Box
          width={isNonMobileScreens ? "50%" : "100%"}
          display={"flex"}
        >
          {isNonMobileScreens 
          ? <ImagemArtistas /> 
          : <Form translation={translation} />}
        </Box>
        <Box
          width={isNonMobileScreens ? "60%" : "100%"}
          display={"flex"} >
          {!isNonMobileScreens 
          ? <ImagemArtistas /> 
          : <Form translation={translation} />}
        </Box>
      </Box>
    </Box>
    
  );
};

export default LoginPage;
