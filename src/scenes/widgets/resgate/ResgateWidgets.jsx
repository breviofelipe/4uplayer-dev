import { Alert, Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import LoadingComponent from "components/loading/Loading";
import Confetes from "./components/Confetes";
import CheckIcon from '@mui/icons-material/Check';
import reCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
const ResgateWidget = () => {

    const [isLoading, setLoading] = useState(false);
    const [confetes, setConfetes] = useState(false);
    const token = useSelector((state) => state.token);
    const { id } = useSelector((state) => state.user);
    const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const captchaRef = useRef(null)

    const initialValuesRegister = {
        code: "",
        address: ""
    }
    const schema = yup.object().shape({
        code: yup.string().required("Obrigatório"),
        address: yup.string().required("Obrigatório"),
      });

    const postResgateCode = async (values, onSubmitProps, e) => {

        const token = captchaRef.current.getValue();
        captchaRef.current.reset();

        setLoading(true);
        const response = await fetch(url+`/notifications/code`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ code : values.code, address: values.address, userId: id })
        });
        if(response.ok) { 
            setLoading(false);
            onSubmitProps.resetForm();
            setConfetes(true);
            setTimeout(() => setConfetes(false), 30000);
        }
        else {
            const status = response.status;
            const data = await response.text();
            console.log(data);
            setLoading(false);
           if(status == 405){
            onSubmitProps.setFieldError('address', data);
           } else {
            onSubmitProps.setFieldError('code', data);
           }
        }

    }
    
    const content = () => {

        

        return <><Box>
            {confetes && <Confetes />}
        <Formik
                onSubmit={postResgateCode}
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
                resetForm}) => (<form onSubmit={handleSubmit} >
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4", marginBottom: "1rem" },
                        }}
                    >
                    {confetes && <Alert onClose={() => {setConfetes(false)}} sx={{ gridColumn: "span 4", marginTop: "1rem" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                      <Typography>Código resgatado com sucesso, sua PLC chegará em breve.</Typography>
                    </Alert>}
                    <TextField
                        disabled={isLoading}
                        label={"Código de resgate"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.code}
                        name="code"
                        error={
                            Boolean(touched.code) && Boolean(errors.code)
                        }
                        helperText={touched.code && errors.code}
                        sx={{ gridColumn: "span 4" }}
                        />
                    <TextField
                        disabled={isLoading}
                        label={"Endereço da carteira"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        name="address"
                        error={ Boolean(touched.address) && Boolean(errors.address) }
                        helperText={touched.address && errors.address}
                        sx={{ gridColumn: "span 4" }} />
                    </Box>
                    <div class="g-recaptcha" data-sitekey={process.env.REACT_APP_SITE_KEY}></div>
                    {/* <reCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={captchaRef}
                        onChange={handleChange}
                        /> */}


                    {isLoading ? <LoadingComponent /> : <Button 
                        fullWidth
                        type="submit">Enviar</Button>  } 
                </form>)
            }
            </Formik>
            
        </Box> 
    </>
    }

    return <PostComponent titulo={"PLC Resgate"} subtitulo={"Utilize códigos de restate"} content={content()} icon={<img width={"30px"} height={"30px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} />}/>
}

export default ResgateWidget;