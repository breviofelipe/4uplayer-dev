import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";


const ReCaptchaComponent = ({handleRecaptchaChange}) => {
    
    const mode = useSelector((state) => state.mode);
    return <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} theme={mode} onChange={handleRecaptchaChange}/>
}

export default ReCaptchaComponent;
