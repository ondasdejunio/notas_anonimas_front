import { useRef } from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const PopoverDeletePost = (props) => {
  const { handleClickButton, children, isLoading, title, message } = props;
  const initialFocusRef = useRef();

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={!isLoading}
      closeOnEsc={!isLoading}
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>{children}</PopoverTrigger>
          <PopoverContent
            color="white"
            bg="primary.500"
            borderColor="primary.500"
            borderRadius="0px"
            sx={{ cursor: "default" }}
            onClick={(e) => e.stopPropagation()}
          >
            <PopoverHeader fontWeight="bold" bg="primary.400" border="none">
              {title}
            </PopoverHeader>
            <PopoverArrow bg="primary.400" borderColor="primary.500" />
            <PopoverCloseButton
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
            <PopoverBody>{message}</PopoverBody>
            <PopoverFooter
              border="0"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              pb={4}
            >
              <ButtonGroup spacing="5px">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  minWidth="98px"
                  isLoading={isLoading}
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    handleClickButton();
                  }}
                  ref={initialFocusRef}
                  disabled={isLoading}
                >
                  Confirmar
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

PopoverDeletePost.propTypes = {
  isLoading: PropTypes.bool,
  handleClickButton: PropTypes.func,
  children: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.string,
};

PopoverDeletePost.defaultProps = {
  isLoading: false,
  handleClickButton: undefined,
  children: undefined,
  title: undefined,
  message: undefined,
};

export default PopoverDeletePost;
