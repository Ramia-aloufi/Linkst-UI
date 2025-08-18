import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7E68CA", // Logo purple
    },
    secondary: {
      main: "#B4CA68", // Logo green
    },
    background: {
      default: "#1F2226", // Dark neutral background
      paper: "#212534",   // Slightly lighter for cards/panels
    },
    text: {
      primary: "#FFFFFF", // Main text
      secondary: "#B4CA68", // Accent text (optional)
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#1F2226",
          color: "#FFFFFF",
        },
      },
    },
  },
});

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7E68CA", // Logo purple
    },
    secondary: {
      main: "#B4CA68", // Logo green
    },
    background: {
      default: "#F5F6EF", // Light neutral background
      paper: "#FFFFFF",   // Cards / panels
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F6EF",
          color: "#000000",
        },
      },
    },
  },
});

