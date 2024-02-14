import { Button, useTheme } from "@mui/material";


const PostButton = ({ text, disabled = false, onClick }) => {
    const { palette } = useTheme();

    return <Button
    disabled={disabled}
    onClick={onClick}
    sx={{
      color: palette.background.alt,
      backgroundColor: palette.primary.main,
      borderRadius: "3rem",
      fontSize: 16,
      padding: "0.5rem"
    }}
  >
    {text}
  </Button>
}

export default PostButton;