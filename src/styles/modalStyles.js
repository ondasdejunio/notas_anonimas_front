import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const alert = definePartsStyle({
  overlay: {
    bg: "blackAlpha.500",
  },
  dialog: {
    maxWidth: ["90%", "70%", "60%", "35%"],
    minWidth: "30%",
    padding: { base: "20px 10px", md: "30px 10px", lg: "50px 20px" },
  },
  closeButton: {
    borderRadius: "0px",
    color: "primary.50",
    fontSize: "15px",
  },
});

const card = definePartsStyle({
  overlay: {
    bg: "blackAlpha.600",
  },
  dialog: {
    maxWidth: ["100%", "95%", "80%", "60%"],
    minWidth: "60%",
    padding: { base: "10px", md: "30px 10px", lg: "35px 20px" },
    bg: `transparent`,
    boxShadow: "none",
  },
});

const baseStyle = definePartsStyle({
  overlay: {
    bg: "blackAlpha.500",
  },
  dialog: {
    maxWidth: { base: "80%", md: "40%", lg: "30%" },
    minWidth: "30%",
    borderRadius: "0px",
    bg: `primary.400`,
  },
  closeButton: {
    borderRadius: "0px",
    color: "primary.50",
    fontSize: "15px",
  },
});

export const modalStyles = defineMultiStyleConfig({
  baseStyle,
  variants: { alert, card },
});
