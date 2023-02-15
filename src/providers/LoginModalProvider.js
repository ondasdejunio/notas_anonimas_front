import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Heading,
  VStack,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const LoginModalContext = createContext();

const LoginModalContextProvider = (props) => {
  const { children } = props;
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navigate = useNavigate();

  return (
    <LoginModalContext.Provider value={{ openLoginModal, setOpenLoginModal }}>
      {children}
      <Modal
        isOpen={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        isCentered
        variant="alert"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            sx={{ borderRadius: "0px", color: "primary.50", fontSize: "15px" }}
          />
          <ModalBody>
            <VStack spacing="20px">
              <VStack
                width="100%"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Heading
                  as="h1"
                  size={{ base: "md", lg: "lg" }}
                  color="secondary.200"
                >
                  Haz parte de esta comunidad
                </Heading>
                <Text textAlign="start" color="primary.50">
                  Loguéate o regístrate para hacer más.
                </Text>
              </VStack>
              <VStack width="100%" spacing="5px">
                <Button
                  sx={{
                    width: "100%",
                    paddingX: "10px",
                    alignSelf: "flex-end",
                  }}
                  variant="primary"
                  aria-label="Iniciar sesión"
                  size="md"
                  onClick={() => {
                    navigate("/user");
                    setOpenLoginModal(false);
                  }}
                >
                  Inicia sesión
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    paddingX: "10px",
                    alignSelf: "flex-end",
                  }}
                  variant="secondary"
                  aria-label="Iniciar sesión"
                  size="md"
                  onClick={() => {
                    navigate("/user/register");
                    setOpenLoginModal(false);
                  }}
                >
                  Regístrate
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </LoginModalContext.Provider>
  );
};

LoginModalContextProvider.propTypes = {
  children: PropTypes.any,
};

LoginModalContextProvider.defaultProps = {
  children: undefined,
};

export { LoginModalContext, LoginModalContextProvider };
