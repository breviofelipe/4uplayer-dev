
import FlexBetween from "components/FlexBetween";
import { InputBase, useTheme } from "@mui/material";



const InputComponent = ({placeholder,value,setValue}) => {
    const { palette } = useTheme();
    return <FlexBetween gap="1.5rem">
            <InputBase
            type="number"
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1.5rem",
                m: "1rem 0",
                p: "0.5rem",
            }}
            />
        </FlexBetween>
}

export default InputComponent;