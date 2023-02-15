import { forwardRef } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

const AutoResizeTextArea = forwardRef((props, ref) => {
  return (
    <Textarea
      minHeight="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  );
});

AutoResizeTextArea.displayName = "AutoResizeTextArea";
export default AutoResizeTextArea;
