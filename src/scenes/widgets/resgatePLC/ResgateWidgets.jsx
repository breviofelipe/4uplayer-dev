import { Box, Button, InputBase, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import LoadingComponent from "components/loading/Loading";
import Confetes from "./components/Confetes";

const ResgateWidget = () => {

    const [isLoading, setLoading] = useState(false);
    const [confetes, setConfetes] = useState(false);
    const token = useSelector((state) => state.token);
    const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const [isOpen, setOpen] = useState(false);
    const { palette } = useTheme();
    const main = palette.neutral.main;

    const initialValuesRegister = {
        code: "",
        address: ""
    }
    const schema = yup.object().shape({
        code: yup.string().required("Obrigatório"),
        address: yup.string().required("Obrigatório"),
      });

    const postResgateCode = async (values, onSubmitProps) => {
        setLoading(true);
        const response = await fetch(url+`/notifications/code`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ code : values.code, address: values.address })
        });
        if(response.ok) { 
            setLoading(false);
            onSubmitProps.resetForm();
            setConfetes(true);
            setTimeout(() => setConfetes(false), 10000);
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
                    <TextField
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
                        label={"Endereço da carteira"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        name="address"
                        error={ Boolean(touched.address) && Boolean(errors.address) }
                        helperText={touched.address && errors.address}
                        sx={{ gridColumn: "span 4" }} />
                    </Box>
                    {isLoading ? <LoadingComponent /> : <Button 
                        fullWidth
                        type="submit">Enviar</Button>  } 
                </form>)
            }
            </Formik>
            
        </Box> 
    </>
    }

    return <PostComponent titulo={"PLC Resgate"} subtitulo={"Utilize seu códigos de restate"} content={content()} icon={<img width={"30px"} height={"30px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} />}/>
}

export default ResgateWidget;