import React, { useEffect }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import SpectaclePage from "scenes/spectaclePage";
import ActorPage from 'scenes/actorPage';
import PersonagemPage from 'scenes/personagemPage';
import GamePage from 'scenes/gamePage';
import CadastroTurmaPage from 'scenes/cadastroTurmaPage';
import { setTranslation } from 'state';
import EditProfilePage from 'scenes/editProfilePage';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(
      setTranslation({
        loginPage: {
          title: "Titulo",
          frase: "Bem vindo ao que quiser",
          fraseFormCriar: "Não tem uma conta? Crie aqui.",
          fraseFormEntrar: "Já tem uma conta? Entre aqui.",
          fraseRequired: "Obrigatório",
          fraseEmail: "Email inválido!",
          warningLogin: "Usuário ou senha inválido!",
          sucessRegister: "Usuário criado com sucesso!",
          error: "Falha - Tente novamente mais tarde",
          addPic: "Adicione uma foto aqui",
          formEmail: "E-mail",
          formPassword: "Senha",
          formName: "Nome",
          formLastName: "Sobrenome",
          formClan: "Clã",
          formNickname: "Nickname",
          formLogin: "Entrar",
          formRegister: "Cadastrar"
        }
      })
    );
  }, [])
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/spectacle/"
              element={isAuth ? <SpectaclePage /> : <Navigate to="/" />}
            />
            <Route
              path="/ator/"
              element={isAuth ? <ActorPage /> : <Navigate to="/" />}
            />
            <Route
              path="/personagem"
              element={isAuth ? <PersonagemPage /> : <Navigate to="/" />}
            />
            <Route
              path="/games"
              element={isAuth ? <GamePage /> : <Navigate to="/" />}
            />
            <Route
              path="/cadastro/turma"
              element={isAuth ? <CadastroTurmaPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/email"
              element={isAuth ? <EditProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
