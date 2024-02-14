import { Typography, useTheme } from "@mui/material";
import "./CountdownTimer.css";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  const { palette } = useTheme();
    const dark = palette.neutral.dark;
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <Typography margin={0} variant="h4"
                    color={dark}
                    fontWeight="500">{value}</Typography>
      <Typography lineHeight="1rem" textTransform="uppercase" color={palette.primary.main}>{type}</Typography>
    </div>
  );
};

export default DateTimeDisplay;
