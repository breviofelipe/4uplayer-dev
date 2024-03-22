import { Alert, Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import LoadingComponent from "components/loading/Loading";
import Confetes from "./components/Confetes";
import CheckIcon from '@mui/icons-material/Check';

import ReCaptchaComponent from "components/reCaptcha/ReCaptchaComponent";

const ResgateWidget = () => {

    const [isLoading, setLoading] = useState(false);
    const [confetes, setConfetes] = useState(false);
    const [strike, setStrike] = useState(0);
    const token = useSelector((state) => state.token);
    const { id } = useSelector((state) => state.user);
    const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const handleRecaptchaChange = (token) => {
      setRecaptchaToken(token);
    };
    
    const initialValuesRegister = {
        code: "",
        address: "",
        recaptcha: recaptchaToken
    }
    const schema = yup.object().shape({
        code: yup.string().required("Obrigatório"),
        address: yup.string().required("Obrigatório"),
    });

    const strikeLimit = 1;
    const postResgateCode = async (values, onSubmitProps) => {
        if(strike > strikeLimit && recaptchaToken === null){
            onSubmitProps.setFieldError('recaptcha', "Não sou um robô Obrigatório");
        } else {
            console.log(recaptchaToken);
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
                setLoading(false);
                if(status == 405){
                    onSubmitProps.setFieldError('address', data);
                } else {
                    onSubmitProps.setFieldError('code', data);
                }
                setStrike(strike+1);
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
                    {strike > strikeLimit && <ReCaptchaComponent handleRecaptchaChange={handleRecaptchaChange} />}
                    {errors.recaptcha 
                    && touched.recaptcha && (
                    <Typography color={"error"}>
                        {errors.recaptcha}
                    </Typography>
                    )}
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