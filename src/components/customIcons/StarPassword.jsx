import { SvgIcon } from '@mui/material';

const StarPassword = (props) => {
    const base64SVG = "https://res.cloudinary.com/dosghtja7/image/upload/v1721341794/assets/icons/mh5pcatlcwa52bllyfkh.svg";
    const style = {
        margin: "0 auto",
        display: "flex"
      };
  return (
    <div style={style}>
      <img src={base64SVG} alt="Custom Icon" />
    </div>
  );
};

export default StarPassword;
