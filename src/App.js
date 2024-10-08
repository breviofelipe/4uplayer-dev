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
import GamePage from 'scenes/gamePage';
import { setTranslation } from 'state';
import EditProfilePage from 'scenes/editProfilePage';
import NotificationPage from 'scenes/notificationPage';
import NoAuthPage from 'scenes/noAuthPage';
import NotFound from 'scenes/notFoundPage';
import { initMercadoPago } from '@mercadopago/sdk-react';
import CofunderPage from 'scenes/cofunderPage';
import RegisterCofunder from 'scenes/registerCofunder';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();
  const keyMercadoPago = process.env.REACT_APP_MERCADO_PAGO;
  var locale = {locale: 'pt-BR'}; 
  initMercadoPago(keyMercadoPago, locale);

  useEffect(() => {

    dispatch(
      setTranslation({
        loginPage: {
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
      })
    );
  }, [])
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/guest/:code" element={<NoAuthPage />} />
            <Route path="/cofunder/:code" element={<RegisterCofunder />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/games"
              element={isAuth ? <GamePage /> : <Navigate to="/" />}
            />
            <Route
              path="/cofunders"
              element={isAuth ? <CofunderPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/email"
              element={isAuth ? <EditProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/notifications/:id"
              element={isAuth ? <NotificationPage /> : <Navigate to="/" />}
            />


          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
