import { Box, useMediaQuery } from "@mui/material";
import "./login.css";

import FormCofunder from "./components/FormCofunder";
import ImagemArtistas from "scenes/loginPage/components/ImagemArtistas";


const RegisterCofunder = () => {

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
          : <FormCofunder translation={translation} />}
        </Box>
        <Box
          width={isNonMobileScreens ? "60%" : "100%"}
          display={"flex"} >
          {!isNonMobileScreens 
          ? <ImagemArtistas /> 
          : <FormCofunder translation={translation} />}
        </Box>
      </Box>
    </Box>
    
  );
};

export default RegisterCofunder;
