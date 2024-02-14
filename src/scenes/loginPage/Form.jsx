import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import LoadingComponent from "components/loading/Loading";
import Alert from '@mui/material/Alert';


const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  clan: "",
  nickName: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = ({ translation }) => {
  const [loading, setLoading] = useState(false);
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [warning, setWarning] = useState();
  const [success, setSuccess] =  useState();

  const urlEnv = process.env.REACT_APP_HOST_LOGIN;
  const loginSchema = yup.object().shape({
    email: yup.string().email(translation.loginPage.fraseEmail).required(translation.loginPage.fraseRequired),
    password: yup.string().required(translation.loginPage.fraseRequired),
  });

  const registerSchema = yup.object().shape({
    firstName: yup.string().required(translation.loginPage.fraseRequired),
    lastName: yup.string().required(translation.loginPage.fraseRequired),
    email: yup.string().email(translation.loginPage.fraseEmail).required(translation.loginPage.fraseRequired),
    password: yup.string().required(translation.loginPage.fraseRequired),
    clan: yup.string(),
    nickName: yup.string(),
    picture: yup.string(),
  });
  const register = async (values, onSubmitProps) => {
    setLoading(true);

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
  };

  
  const login = async (values, onSubmitProps) => {
    setLoading(true);
    const loggedInResponse = await fetch(urlEnv+"/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
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
        }
    } catch (err) {
        setLoading(false)
        console.log(err);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <div>
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
      validationSchema={isLogin ? loginSchema : registerSchema}
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
                  value={values.clan}
                  name="clan"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label={translation.loginPage.formNickname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nickName}
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
            /></>
            }
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
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
              {isLogin ? translation.loginPage.formLogin : translation.loginPage.formRegister}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ?  translation.loginPage.fraseFormCriar
                :  translation.loginPage.fraseFormEntrar }
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
        </div>
          }
    </div>
  );
  }
export default Form;
