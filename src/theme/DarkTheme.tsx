import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "rgb(88, 199, 250)"
        },
        secondary: {
            main: "#5A20CB"
        },
        background:{
            default: "#212534",
            paper:"#212534"
        }
    }
})