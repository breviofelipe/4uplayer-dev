import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import LoadingComponent from "components/loading/Loading";
import Alert from '@mui/material/Alert';
import ReCaptchaComponent from "components/reCaptcha/ReCaptchaComponent";
import Icon4uPlayer from "components/icons/Icon4uPlayer";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarPassword from "components/customIcons/StarPassword";



const Form = ({ translation }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clan = searchParams.get('clan') || "";
  const [loading, setLoading] = useState(false);
  const [pageType, setPageType] = useState(clan !== "" ? "register" : "login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isNewPassword = pageType === "password";
  const [warning, setWarning] = useState();
  const [success, setSuccess] =  useState();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [strike, setStrike] = useState(0);


  let initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    clan: clan,
    picture: "",
  };
  

  const strikeLimit = 1;
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };
  const urlEnv = process.env.REACT_APP_HOST_LOGIN;

  const initialValuesLogin = {
    email: "",
    password: "",
    recaptcha: recaptchaToken
  };

  
  const loginSchema = yup.object().shape({
    email: yup.string().email(translation.loginPage.fraseEmail).required(translation.loginPage.fraseRequired),
    password: yup.string().required(translation.loginPage.fraseRequired),
  });

  const registerSchema = yup.object().shape({
    firstName: yup.string().required(translation.loginPage.fraseRequired),
    lastName: yup.string().required(translation.loginPage.fraseRequired),
    email: yup.string().email(translation.loginPage.fraseEmail).required(translation.loginPage.fraseRequired),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required(translation.loginPage.fraseRequired),
    clan: yup.string(),
    picture: yup.string(),
  });
  const passwordSchema = yup.object().shape({
    email: yup.string().email(translation.loginPage.fraseEmail).required(translation.loginPage.fraseRequired),
  });

  const getBase64FromUrl = (values, onSubmitProps) => {
    var reader = new FileReader();
    reader.readAsDataURL(values.picture);
    reader.onload = async function () {
      values.picture = reader.result;
       let body = JSON.stringify(values);
      //  body.image = reader.result;
       const savedUserResponse = await fetch(
         urlEnv+"/auth/register",
         {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: body
         }
       ).catch(err => {
         console.log(err);
       });
       validaStatus(savedUserResponse, onSubmitProps);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
     };
  }

  const register = async (values, onSubmitProps) => {
    setLoading(true);

    if(values.picture){
      getBase64FromUrl(values, onSubmitProps);
    } else {
      if(clan!== '')
        values.clan = clan;
      const savedUserResponse = await fetch(
        urlEnv+"/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        }
      ).catch(err => {
        console.log(err);
      });
      validaStatus(savedUserResponse, onSubmitProps);
    }    
  };

  async function validaStatus (savedUserResponse, onSubmitProps){
    const status = savedUserResponse.status;
    if(status === 200){
      const savedUser = await savedUserResponse.json();
      setLoading(false);
      onSubmitProps.resetForm();
      setWarning(null);
      setSuccess(translation.loginPage.sucessRegister);
      if (savedUser) {
        setPageType("login");
      }
    } else if(status === 400){
      setLoading(false)
      const text = await savedUserResponse.text();
      setWarning(text)
    } else {
      setLoading(false)
      setWarning(translation.loginPage.error)
    }
  }
  
  const login = async (values, onSubmitProps) => {
    if(strike > strikeLimit && recaptchaToken === null){
      onSubmitProps.setFieldError('recaptcha', "Não sou um robô Obrigatório");
  } else {
    setLoading(true);
    if(strike > strikeLimit && window.grecaptcha){
      try{
          window.grecaptcha.reset();
      } catch (err){
          console.log(err);
      }
    }
    const loggedInResponse = await fetch(urlEnv+"/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setRecaptchaToken(null);
     try {
      
      const status = loggedInResponse.status;
      
      if(status === 200){
      
        const loggedIn = await loggedInResponse.json();

        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          setLoading(false)
          navigate("/home");
        } 
      } else {
        setLoading(false)
        setWarning(translation.loginPage.warningLogin)
        setStrike(strike+1);
      }
    } catch (err) {
        setLoading(false)
        console.log(err);
    }
  }
  };

  const password = async (values, onSubmitProps) => {

    setLoading(true);
    setSuccess(null);
    setWarning(null);
    const passwordResponse = await fetch(urlEnv+"/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
    .catch(console.log);

     try {
      
      if(passwordResponse.ok){
        setSuccess("Solicitação enviado com sucesso. Verifique seu e-mail!")
      } else {
        const status = passwordResponse.status;
        if (status === 404){
          setWarning("Sistema indisponivel. Tente novamente mais tarde")
        } else {
          setWarning("Email não cadastrado.")
        }
      }
    } catch (err) {
      setWarning("Sistema indisponivel. Tente novamente mais tarde")
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
    if (isNewPassword) await password(values, onSubmitProps);
  };

  return (
    <Box width={"100%"} justifyContent="center" alignItems={"center"} flexDirection={"column"} display={"flex"}>

          <Box p="1rem 6%" gap={"0.5rem"} justifyContent="center" alignItems={"center"} display={"flex"} >
          <Icon4uPlayer />
          <Typography mt={"0.5rem"} fontWeight="bold" fontSize="32px" color={palette.primary.light}>
          {translation != null && translation.loginPage.title}
          </Typography>
          </Box>
        
      {loading ? <LoadingComponent /> : 
      <div>
        { warning && <Alert onClose={() => {
          setWarning(null);
        }}  severity="warning">{warning}</Alert> }

        { success && <Alert onClose={() => {
          setSuccess(null);
        }}  severity="success">{success}</Alert> }
        <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : isNewPassword ? passwordSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            minWidth={"350px"}
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label={translation.loginPage.formName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label={translation.loginPage.formLastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
              label={translation.loginPage.formEmail}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label={translation.loginPage.formPassword}
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
                <TextField
                  label={translation.loginPage.formClan}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={clan}
                  disabled={clan !== ''}
                  name="clan"
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>{translation.loginPage.addPic}</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {isLogin && <><TextField
              label={translation.loginPage.formEmail}
              color="info"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4", bgcolor: "background.alt" }}
              placeholder="E-mail ou nome de usuário"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="large"/>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label={translation.loginPage.formPassword}
              type="password"
              color="info"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4", bgcolor: "background.alt" }}
              placeholder="Senha"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarPassword />
                  </InputAdornment>
                ),
              }}
            />
            </>
            }
            {isNewPassword && <>
              <TextField
              label={"Recuperar senha e-mail"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }} />
            </>}
          </Box>
            <Box mt={"1rem"}>
            {strike > strikeLimit && <ReCaptchaComponent handleRecaptchaChange={handleRecaptchaChange} />}
                    {errors.recaptcha 
                    && touched.recaptcha && (
                    <Typography color={"error"}>
                        {errors.recaptcha}
                    </Typography>
                    )}

            </Box>
          {/* BUTTONS */}
          <Box>
            <FlexBetween>
            
            {!isNewPassword &&  <Typography
            onClick={() => {
              setPageType("password");
            }}
            sx={{
                textDecoration: "underline",
                color: palette.primary.light,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}>Esqueci a minha senha</Typography>}
            <Button
              type="submit"
              sx={{
                width: "50%",
                m: "1rem 0",
                p: "0.5rem",
                borderRadius: 20,
                backgroundColor: palette.primary.main,
                color: palette.primary.light,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? translation.loginPage.formLogin : isNewPassword ? "Solicitar recuperação de senha" : translation.loginPage.formRegister}
            </Button>
            
            </FlexBetween>
            <FlexBetween>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                m: "1rem 0",
                p: "0.5rem",
                borderRadius: 20,
                borderWidth: 1,
                "&:hover": { color: palette.primary.light },
              }}
            >
              {isLogin
                ?  translation.loginPage.fraseFormCriar
                :  translation.loginPage.fraseFormEntrar }
            </Button>
            </FlexBetween>
          </Box>
        </form>
      )}
    </Formik>
        </div>
          }
    </Box>
  );
  }
export default Form;
