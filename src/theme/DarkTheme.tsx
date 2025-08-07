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
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#1F2226",
                    color: "rgb(88, 199, 250)"
                }
            }
        }
    }
    
})

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#CAD6A0"
        },
        secondary: {
            main: "#CAD6A0"
        },
        background:{
            default: "#F0F4F8",
            paper:"#FFFFFF"
        },
        text: {
            primary: "#000000",
            secondary: "#555555"
        }
    },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F6EF",
          color: "#000000"
        }
      }
    }
  }
    
})