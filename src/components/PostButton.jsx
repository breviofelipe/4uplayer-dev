import { Button, useMediaQuery, useTheme } from "@mui/material";


const PostButton = ({ text, disabled = false, onClick, fullWidth = false }) => {
    const { palette } = useTheme();

    return <Button
    fullWidth={fullWidth}
    disabled={disabled}
    onClick={onClick}
    sx={{
      m: "1rem 0",
      p: "0.5rem",
      borderRadius: "1.5rem",
      backgroundColor: palette.primary.main,
      color: palette.neutral.dark,
      "&:hover": { color: palette.primary.main },
    }}
  >
    {text}
  </Button>
}

export default PostButton;