export const buttonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    navLink: {
      padding: { base: "25px 20px", md: "25px" },
      fontWeight: "500",
      transition: "none",
      fontSize: { base: "20px", md: "16px" },
      textShadow: "0px 1px 1px #191813",
      bgGradient:
        "linear(primary.500 0%, primary.300 10%, primary.500 85%, primary.400 100%)",
      color: "gray.50",
      borderRadius: "10px 10px 0px 0px",
      _hover: {
        bgGradient:
          "linear(primary.500 0%, primary.200 10%, primary.500 85%, primary.400 100%)",
      },
      _active: {
        transition: "all 0.5 ease",
        bgGradient:
          "linear(primary.700 -20%, primary.500 15%, primary.500 40%, primary.500 90%)",
        color: "yellow.50",
      },
    },
    cardButton: {
      bg: "transparent",
      padding: "0px",
      fontSize: "25px",
      _hover: {
        top: "-2px",
      },
      _active: {
        top: "-2px",
        fill: "black",
        transform: "scale(1.3)",
      },
    },
    primary: {
      border: "1px solid #1e4b7b",
      borderRadius: "0px",
      bg: "orange.600",
      color: "gray.100",
      fontSize: "md",
      _hover: {
        bg: "orange.500",
      },
      _active: {
        bg: "orange.700",
      },
      _disabled: {
        bg: "orange.700 !important",
      },
    },
    secondary: {
      bg: "primary.50",
      color: "primary.600",
      border: "1px solid #20395B",
      borderRadius: "0px",
      fontSize: "md",
      _hover: {
        bg: "white",
      },
      _active: {
        bg: "primary.100",
      },
      _disabled: {
        bg: "primary.100 !important",
      },
    },
    tertiary: {
      bg: "secondary.300",
      color: "primary.700",
      border: "1px solid #595316",
      borderRadius: "0px",
      fontSize: "md",
      _hover: {
        bg: "secondary.200",
      },
      _active: {
        bg: "secondary.500",
      },
      _disabled: {
        bg: "secondary.400 !important",
      },
    },
    transparent: {
      bg: "transparent",
      color: "blue.400",
      border: "none",
      fontSize: "sm",
      _hover: {
        color: "blue.500",
      },
      _active: {
        color: "blue.600",
      },
      _disabled: {
        color: "gray.700 !important",
      },
    },
  },
  defaultProps: {
    size: "sm",
    borderRadius: "0px",
  },
};
