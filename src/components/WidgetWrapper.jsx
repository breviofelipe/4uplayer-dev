import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme, mobile = false }) => ({
  padding: mobile ?  "1rem 0.5rem 0.75rem 0.5rem" : "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: mobile ? 0 :"0.75rem",
}));

export default WidgetWrapper;
