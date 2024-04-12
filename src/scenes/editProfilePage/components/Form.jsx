
import React, { useEffect, useState } from "react";
import { Box, Button, InputBase, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { EditOutlined } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import FlexBetween from "components/FlexBetween";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import GamerLoading from "components/gamerLoading/GamerLoading";
import { tr } from "date-fns/locale";

const FormEmailConfirmed = ({emailSended = false}) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const { id, email, emailCheck} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const url = process.env.REACT_APP_HOST_LOGIN;
    
    const [mainContent, setMainContent] = useState();
    const [check, setCheck] = useState(emailSended);
    const [edit, setEdit] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const initialValuesRegister = {
        email: "",
        emailConfirmed: "",
        sendCode: ""
    }


    const schema = yup.object().shape({
        email: yup.string().email("Email inválido!").required("Obrigatório"),
        emailConfirmed: yup.string().email("Email inválido!").required("Obrigatório"),
      });


    const content = () => {

        if(loading) return <GamerLoading />
        
        if(!edit && !check){
            return <Box>
            <Typography variant="h4"
                    fontWeight="500">Enviar código de confirmação para o e-mail</Typography>
            <FlexBetween mt={"2rem"}>
            <Typography variant="h5"
                    fontWeight="400">{email}</Typography>
            <EditOutlined onClick={() => { setEdit(true) }} sx={{ color: main }} />
            </FlexBetween>
            <Button
            onClick={() => checkEmail({email: email, emailConfirmed: email})}  
            sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Enviar
            </Button>
        </Box>
        } else {
            return form();
        }
        
    }

    const checkEmail = async (values, onSubmitProps) => {
        
        if(values.email === values.emailConfirmed){
            let isValid = true;
            if(onSubmitProps){
              const emailRegister = await fetch(url+`/profile/check/${values.email}`, {
                  method: "GET",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                });
              isValid = await emailRegister.json();
              if(!isValid){
                onSubmitProps.setFieldError('email', "E-mail já cadastrado!")
              }
          }
          if(isValid){
            let body = {
              email : values.email,
              emailConfirmed: values.emailConfirmed
            }
            setLoading(true);
            const response = await fetch(url+`/profile/${id}/email`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(body),
            });
            const data = await response.json();
            setLoading(false);
            dispatch(setLogin({
              user: data.user,
              token: data.token,
            }));
            setCheck(!check);    
          }                
          
        } else {
            onSubmitProps.setFieldError('emailConfirmed', "Os e-mails não iguais!")
        }
    }

    const form = () => {
        return <Formik
        onSubmit={checkEmail}
        initialValues={initialValuesRegister}
        validationSchema={schema}
      > 
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm}) => (
       <form onSubmit={handleSubmit}>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >{ !check ? <>

            <TextField
              label={"E-mail"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={
                Boolean(touched.email) && Boolean(errors.email)
              }
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label={"Confirme o e-mail"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.emailConfirmed}
              name="emailConfirmed"
              error={Boolean(touched.emailConfirmed) && Boolean(errors.emailConfirmed)}
              helperText={touched.emailConfirmed && errors.emailConfirmed}
              sx={{ gridColumn: "span 4" }} />
            </> 
            :
            <><TextField
            label="Código enviado para o email..."
            onChange={handleChange}
            value={values.sendCode}
            name="sendCode"
            error={errorCode}
            helperText={errorCode && "Código inválido"}
            sx={{ gridColumn: "span 4", minWidth: "370px"}}
          />
          

        </>
            }
        </Box>
        { !check ? <><Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Confirmar
            </Button>
            {!check && <Button>
            <CancelIcon  onClick={() => {
                    setEdit(false);
                }} fontSize="large" />
            </Button>}</> : 
            <FlexBetween gap={"1rem"}>
              <Button
              fullWidth
              disabled={values.sendCode ? false : true}
              onClick={async () => {
                if(values.sendCode){
                  setLoading(true);
                  const response = await fetch(url+`/profile/${id}/email/${values.sendCode}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    });
                    if(response.ok){
                      const data = await response.json(); 
                      dispatch(setLogin({
                        user: data.user,
                        token: data.token,
                      }));
                      navigate("/home");
                    } else if (response.status >= 400){
                      setErrorCode(true);
                      console.log("Código inválido")
                    }
                    setLoading(false);
                }
              }}
              sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Confirmar
            </Button>
            <Button
            fullWidth
            onClick={() => setCheck(false)}
            sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }} >
                Reenviar
            </Button></FlexBetween> }
       </form>)}
      
      </Formik>
    }

    useEffect(() => {
        setMainContent(content())    
    },[check, edit, errorCode, loading])

    if(emailCheck) navigate("/home");

    return <>{mainContent && <PostComponent titulo={"Confirme seu e-mail"} subtitulo={"Ganhe 1000 PLCs"} content={mainContent} />}</>

}

export default FormEmailConfirmed;