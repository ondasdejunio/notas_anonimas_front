import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginModal = (props) => {
  const { openModal, onCloseModal } = props;
  const navigate = useNavigate();

  return (
    <Modal isOpen={openModal} onClose={onCloseModal} isCentered variant="alert">
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
                onClick={() => navigate("/user")}
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
                onClick={() => navigate("/user/register")}
              >
                Regístrate
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

LoginModal.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

LoginModal.defaultProps = {
  openModal: false,
  onCloseModal: undefined,
};

export default LoginModal;
