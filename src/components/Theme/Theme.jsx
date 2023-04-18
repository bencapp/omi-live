import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Georgia, serif",
  },
  palette: {
    primary: {
      main: "#167798", // dark blue
    },
    secondary: {
      main: "#CBE5DF", // light green
      dark: "#8fa6a0",
    },
    warning: {
      main: "#FFC3C3", // light pink
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        sx: {
          color: "white",
        },
      },
    },
    //  NOTE: this would be for changing the background color
    //  of input fields
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          fontColor: "#000000",
          // commenting this out for now backgroundColor: "#E9E2D8",
        },
      },
    },
  },
});

export default theme;
