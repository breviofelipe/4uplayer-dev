import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  styled,
  Divider
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import LoadingComponent from "components/loading/Loading";
import Alert from '@mui/material/Alert';
import ReCaptchaComponent from "components/reCaptcha/ReCaptchaComponent";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarPassword from "components/customIcons/StarPassword";
import CssTextField from "components/CssTextField";
import { DatePicker } from "@mui/x-date-pickers";
import DataPickerCustom from "./DataPickerCustom";

const FormCofunder = ({ translation }) => {
  const [email, setEmail] = useState(null);

  const urlEnv = process.env.REACT_APP_HOST_LOGIN;
  const [searchParams, setSearchParams] = useSearchParams();
  const clan = searchParams.get('clan') || "";
  const { code } = useParams();
  const [loading, setLoading] = useState(false);
  const [pageType, setPageType] = useState("register");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isNewPassword = pageType === "password";
  const [warning, setWarning] = useState();
  const [success, setSuccess] =  useState();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [strike, setStrike] = useState(0);


  let initialValuesRegister = {
    fullName: "",
    nickName: "",
    email: email,
    password: "",
    picture: "",
  };
  

  const strikeLimit = 1;
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };
  



  const registerSchema = yup.object().shape({
    fullName: yup.string().min(6, 'Nome completo deve ter pelo menos 6 caracteres e um espaço').required(translation.loginPage.fraseRequired),
    nickName: yup.string().required(translation.loginPage.fraseRequired),
    email: yup.string().email(translation.loginPage.fraseEmail).required(translation.loginPage.fraseRequired),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required(translation.loginPage.fraseRequired),
    picture: yup.string(),
  });


  const getBase64FromUrl = (values, onSubmitProps) => {
    var reader = new FileReader();
    reader.readAsDataURL(values.picture);
    reader.onload = async function () {
      values.picture = reader.result;
       let body = JSON.stringify(values);
       const savedUserResponse = await fetch(
         urlEnv+"/auth/register/confunder",
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
        urlEnv+"/auth/register/confunder",
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
  


  const handleFormSubmit = async (values, onSubmitProps) => {
    
    if (isRegister) await register(values, onSubmitProps);
    
  };



  const buttonSubmit = () => {
    return <Button
    type="submit"
    fullWidth
    sx={{
      minWidth: isNonMobile ? "50%" : undefined,
      m: "1rem 0",
      p: "0.5rem",
      borderRadius: "1.5rem",
      backgroundColor: palette.primary.main,
      color: palette.neutral.dark,
      "&:hover": { color: palette.primary.main },
    }}
  >
    começar agora
  </Button>
  }
    const fetchEmailByCode =  async () => {
            setLoading(true);
            const response = await fetch(
                urlEnv+`/auth/check-code/${code}`,
                {
                  method: "GET"
                }
              ).catch(err => {
                console.log(err);
              });
            if(response.ok){
                var jsonResponse =  await response.json();
                setEmail(jsonResponse.email);
                
            }
            setLoading(false);
        
    }

    useEffect(() => {
        fetchEmailByCode();
    }, [code])

  return (
    <Box gap={"2.5rem"} width={"100%"} justifyContent="center" alignItems={"center"} flexDirection={"column"} display={"flex"}>
      <Box p="1rem 6%" gap={"0.5rem"} justifyContent="center" alignItems={"center"} display={"flex"} >
          <img src="https://res.cloudinary.com/dosghtja7/image/upload/v1723684429/assets/login/lfmpnzhct9ydmzusmmc6.png" />
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
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
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
            width={isNonMobile ? "36vw" : "90vw"}
            display="grid"
            gap={"2.5rem"}
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <CssTextField
                  placeholder={"Nome completo"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  name="fullName"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon fontSize="large"/>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    Boolean(touched.fullName) && Boolean(errors.fullName)
                  }
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 2", bgcolor: "background.alt", borderRadius: "1.5rem"  }}
                />
                <CssTextField
                  placeholder={"Nome de usuário"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nickName}
                  name="nickName"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon fontSize="large"/>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.nickName) && Boolean(errors.nickName)}
                  helperText={touched.nickName && errors.nickName}
                  sx={{ gridColumn: "span 2", bgcolor: "background.alt", borderRadius: "1.5rem"  }}
                />
                <CssTextField
                    disabled
                    placeholder={translation.loginPage.formEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon fontSize="large"/>
                          </InputAdornment>
                        ),
                      }}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4", bgcolor: "background.alt", borderRadius: "1.5rem"  }}
            />
            <CssTextField
              placeholder={translation.loginPage.formPassword}
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarPassword />
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4", bgcolor: "background.alt", borderRadius: "1.5rem"  }}
            />               
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                  bgcolor="background.alt"
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
                        sx={{ bgcolor: "background.alt", "&:hover": { cursor: "pointer" } }}
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
          {!success ? <Box gap={"2.5rem"}>
              {buttonSubmit()}
          </Box>
          : <Box gap={"2.5rem"}>
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                    fullWidth
                    sx={{
                    minWidth: isNonMobile ? "50%" : undefined,
                    m: "1rem 0",
                    p: "0.5rem",
                    borderRadius: "1.5rem",
                    backgroundColor: palette.primary.main,
                    color: palette.neutral.dark,
                    "&:hover": { color: palette.primary.main },
                    }}
                >
                    começar agora
                </Button>
            </Box>
          }
        </form>
      )}
    </Formik>
        </div>
          }
    </Box>
  );
  }
export default FormCofunder;
