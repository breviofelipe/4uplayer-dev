
import {
    TextField,
    styled
  } from "@mui/material";
  
const CssTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
      color: theme.palette.primary.light,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.light,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
        borderRadius: "1.5rem",
        
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.dark,
      },
    },
  }));

export default CssTextField;