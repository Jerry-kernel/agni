import { createTheme, alpha } from "@mui/material/styles";
import { palette, typography, radius } from "./token";

const theme = createTheme({
  palette: {
    primary:    { main: palette.teal[500], dark: palette.teal[600], light: palette.teal[400] },
    secondary:  { main: palette.amber[500] },
    background: { default: palette.neutral[50], paper: palette.neutral[0] },
    text:       { primary: palette.neutral[900], secondary: palette.neutral[500] },
  },
  typography: {
    fontFamily: typography.fontBody,
    h1:{ fontFamily: typography.fontDisplay, fontWeight:800 },
    h2:{ fontFamily: typography.fontDisplay, fontWeight:800 },
    h3:{ fontFamily: typography.fontDisplay, fontWeight:700 },
    h4:{ fontFamily: typography.fontDisplay, fontWeight:700 },
    h5:{ fontFamily: typography.fontDisplay, fontWeight:700 },
    h6:{ fontFamily: typography.fontBody,    fontWeight:700 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiTextField: {
      defaultProps: { variant:"outlined", size:"small", fullWidth:true },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: radius.md,
            fontFamily: typography.fontBody,
            fontSize: "0.875rem",
            backgroundColor: alpha(palette.teal[500], 0.025),
            transition: "box-shadow 0.2s ease",
            "&:hover fieldset":       { borderColor: alpha(palette.teal[500], 0.4) },
            "&.Mui-focused fieldset": { borderColor: palette.teal[500], borderWidth:"1.5px" },
            "&.Mui-focused":          { boxShadow: `0 0 0 3px ${alpha(palette.teal[500], 0.12)}` },
            "&.Mui-error fieldset":   { borderColor: "#d32f2f" },
          },
          "& .MuiInputLabel-root":              { fontFamily: typography.fontBody, fontSize:"0.875rem" },
          "& .MuiInputLabel-root.Mui-focused":  { color: palette.teal[500] },
          "& .MuiFormHelperText-root":           { fontFamily: typography.fontBody, fontSize:"0.72rem" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { fontFamily: typography.fontBody, fontWeight:700, borderRadius: radius.md, textTransform:"none", letterSpacing:"0.01em" },
      },
    },
    MuiMenuItem: {
      styleOverrides: { root: { fontFamily: typography.fontBody, fontSize:"0.875rem" } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage:"none" } },
    },
    MuiChip: {
      styleOverrides: { root: { fontFamily: typography.fontBody, fontWeight:600 } },
    },
  },
});

export default theme;