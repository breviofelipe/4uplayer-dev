import { EditOutlined } from "@mui/icons-material"
import { Button, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import CancelIcon from '@mui/icons-material/Cancel';


const inputLink = (holder, value, setOnChange, palette) => {
  
  
    return <InputBase
    placeholder={holder}
    onChange={(e) => setOnChange(e.target.value)}
    value={value}
    sx={{
      width: "100%",
      backgroundColor: palette.neutral.light,
      borderRadius: "3rem",
      padding: "0.5rem 1rem",
    }}
  />
}


const editSave = (edit, setEdit, type, userId, link, token, setUser, palette) => {
  
  const main = palette.neutral.main;
   if(edit){
      return <FlexBetween gap={"0.5rem"}>
        <Button
          onClick={() => {
            setEdit(false);
          }}>
      <CancelIcon fontSize="large" />
      </Button>
        <Button
      disabled={!link}
      onClick={() => {
        setEdit(false);
        handlePatchLink(link, type, userId, token, setUser);
      }}
      sx={{
        color: palette.background.alt,
        backgroundColor: palette.primary.main,
        borderRadius: "3rem",
      }}
    >
      Salvar
    </Button>
      </FlexBetween>
    } else {
      return <EditOutlined onClick={() => { setEdit(true) }} sx={{ color: main }} />
    }
  }


  const handlePatchLink = async (link, type, userId, token, setUser) => {
    setUser(null);
    const url = process.env.REACT_APP_HOST_USERS;
    const body = {
      link: link,
      userId: userId,
      type: type
    }
    const response = await fetch(url+`/user/link`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setUser(await data);
  }


export { editSave, inputLink };