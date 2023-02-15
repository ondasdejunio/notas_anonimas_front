import { Alert, extendTheme, Input, Select, Textarea } from "@chakra-ui/react";

import { buttonStyles } from "./buttonStyles";
import { textStyles } from "./textStyles";
import { inputStyles } from "./inputStyles";
import { alertStyles } from "./alertStyles";
import { modalStyles } from "./modalStyles";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#eaeef3",
      100: "#c0cbda",
      200: "#96a9c1",
      300: "#6b86a8",
      400: "#41638f",
      500: "#284a75",
      600: "#1f395b",
      700: "#162941",
      800: "#0d1927",
      900: "#04080d",
    },
    secondary: {
      50: "#fefef9",
      100: "#fdfbed",
      200: "#fbf9e1",
      300: "#f9f6d4",
      400: "#f8f3c8",
      500: "#dedaaf",
      600: "#ada988",
      700: "#7c7961",
      800: "#4a493a",
      900: "#191813",
    },
    tertiary: {
      50: "#ffffff",
      100: "#fdecef",
      200: "#fbdadf",
      300: "#f9c7cf",
      400: "#f7b5bf",
      500: "#f5a2af",
      600: "#f38f9f",
      700: "#f17d8f",
      800: "#ef6a7f",
      900: "#ed586f",
    },
  },
  components: {
    Button: buttonStyles,
    Text: textStyles,
    Alert: alertStyles,
    Modal: modalStyles,
  },
});

Input.defaultProps = { ...Input.defaultProps, ...inputStyles.defaultProps };
Textarea.defaultProps = {
  ...Textarea.defaultProps,
  ...inputStyles.defaultProps,
};
Select.defaultProps = { ...Select.defaultProps, ...inputStyles.defaultProps };
Alert.defaultProps = { ...Alert.defaultProps, ...alertStyles.defaultProps };

export default theme;
