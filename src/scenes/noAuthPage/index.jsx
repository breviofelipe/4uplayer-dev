import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostBuild from "components/postConstruction/PostConstruction";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Alert, Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import GamerLoading from "components/gamerLoading/GamerLoading";
import { useState } from "react";

export default function NoAuthPage () {

    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] =  useState();
    const [warning, setWarning] = useState();

    const MIN = 1;
    const initialValuesPassword = {
        password: "",
        confirmedPassword: "",
    };

    const urlEnv = process.env.REACT_APP_HOST_LOGIN;
    const passwordSchema = yup.object().shape({
        password: yup.string().min(MIN,`Senha deve conter ao menos ${MIN} digitos`).required("Obrigatório"),
        confirmedPassword: yup.string().required("Obrigatório"),
    });


    const { code } = useParams();
    

    const topContent = () => {
        
    }


    const mainContent = () => {

        const handleSubmit = async (values, onSubmitProps) => {     
        if(values.password === values.confirmedPassword){
                setLoading(true);
                setWarning(null);
                setSuccess(null)
                const response = await fetch(urlEnv+`/auth/password/${code}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
                })
                .catch(console.log);
                try{
                    if(response.ok){
                        if(response.status === 200){
                            setSuccess("Senha atualizada com sucesso")
                        }
                    } else {
                        setWarning("Está senha já foi atualizada anteriormente com este link!")
                    }
                } catch ( error ) {
                    setWarning("Sistema indisponivel. Tente novamente mais tarde")
                } finally {
                    setLoading(false);                          
                }
            } else {
                onSubmitProps.setFieldError('confirmedPassword', "Senhas diferentes")
            }
        }

        const form = () => {
            return <Box>
                    <Box mb={'2rem'}>
                    { warning && <Alert onClose={() => {
                        setWarning(null);
                    }}  severity="warning">{warning}</Alert> }                   
                    </Box>
                    { success 
                    ? 
                    <Alert onClose={() => {
                        navigate("/");
                    }}  severity="success">
                        {success}</Alert> 
                        : 
                    <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValuesPassword}
                    validationSchema={passwordSchema}
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
                        <Box display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}  >
                            <TextField
                                label={"Nova senha"}
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
                                label={"Confirme a nova senha"}
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmedPassword}
                                name="confirmedPassword"
                                error={Boolean(touched.confirmedPassword) && Boolean(errors.confirmedPassword)}
                                helperText={touched.confirmedPassword && errors.confirmedPassword}
                                sx={{ gridColumn: "span 4" }}
                                />
                        </Box>
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
                            Enviar
                            </Button>
                        </form>
                        )}
                    </Formik> }
            </Box>
        }

        return <PostComponent titulo={"Página Guest"} subTitulo={code} content={!loading ? form() : <GamerLoading />} isCenter={success? true : false} />
    }
    const lastContent = () => {
        
    }
    return <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()} />
}