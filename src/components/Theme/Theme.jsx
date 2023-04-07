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
    // NOTE: this would be for changing the background color
    // of input fields
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#E9E2D8",
    //     },
    //   },
    // },
  },
});

export default theme;
