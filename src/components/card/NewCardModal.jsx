import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import useToast from "../../hooks/useToast";
import { createPost } from "../../services/post";
import { getCardDescriptionFontSize, userGenderColors } from "../../utils/user";
import useAuth from "../../hooks/useAuth";
import AutoResizeTextArea from "../AutoResizeTextArea";

const NewCardModal = (props) => {
  const { onCreatedPost, openModal, onCloseModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const { userDetails } = useAuth();
  const {
    contentBgColor = "",
    headerBgColor = "",
    color = "",
  } = userGenderColors[userDetails.gender];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Campo requerido.").min(10).max(60),
    description: Yup.string().required("Campo requerido.").min(20).max(450),
  });

  const initialValues = {
    title: "",
    description: "",
  };

  const handleSubmit = (post, { resetForm }) => {
    setIsLoading(true);
    createPost(post)
      .then((r) => {
        successToast("¡Publicación creada!");
        resetForm();
        setIsLoading(false);
        onCreatedPost(true, r.data.post);
      })
      .catch((e) => {
        const { response = null } = e;
        if (response && response?.status === 401 && response?.data) {
          errorToast(response.data);
          console.error(response.data);
        } else {
          errorToast("Oops, tuvimos un problema creando tu publicación.");
          console.error("Oh, tuvimos un problema creando tu publicación.");
        }
        setIsLoading(false);
      });
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={onCloseModal}
      variant="card"
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          disabled={isLoading}
          sx={{ borderRadius: "0px", color: "primary.50", fontSize: "15px" }}
        />
        <ModalBody>
          <Box width="100%">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnMount
            >
              {({ values, handleChange, handleBlur, isValid }) => (
                <Form autoComplete="off">
                  <Flex direction="column">
                    <Box
                      height="fit-content"
                      maxHeight="80vh"
                      width="100%"
                      bg={contentBgColor}
                      border="1px solid #dedaaf"
                      borderRadius="5px"
                      overflow="hidden"
                      boxShadow="xl"
                    >
                      <Flex
                        width="100%"
                        minHeight={{
                          base: "50vh",
                          md: "fit-content",
                          lg: "fit-content",
                        }}
                        maxHeight={{
                          base: "85vh",
                          md: "70vh",
                        }}
                        direction="column"
                      >
                        <VStack spacing="0px">
                          <Box
                            width="100%"
                            padding={{ base: "5px", md: "10px", lg: "15px" }}
                            bgGradient={headerBgColor}
                            borderBottom="1px solid #dedaaf"
                          >
                            <FormControl isRequired={true}>
                              <Input
                                sx={{
                                  height: "40px",
                                  bgColor: "transparent",
                                  border: "none",
                                  borderBottom: "1px",
                                  borderColor: color,
                                  _placeholder: { color, opacity: "0.5" },
                                  fontSize: {
                                    base: "20px",
                                    md: "17px",
                                    lg: "18px",
                                  },
                                }}
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={color}
                                value={values.title}
                                type="text"
                                placeholder="Tu título aquí..."
                                disabled={isLoading}
                              />
                            </FormControl>
                          </Box>
                          <Box
                            width="100%"
                            padding={{ base: "5px", md: "10px", lg: "15px" }}
                            borderBottom="1px solid #dedaaf"
                          >
                            <FormControl isRequired={true}>
                              <AutoResizeTextArea
                                sx={{
                                  minHeight: {
                                    base: "40vh",
                                    md: "200px !important",
                                  },
                                  maxHeight: {
                                    base: "80vh",
                                    md: "300px !important",
                                  },
                                  overflowY: "auto",
                                  bgColor: "transparent",
                                  border: "none",
                                  fontSize: getCardDescriptionFontSize(
                                    values.description
                                  ),
                                  _placeholder: {
                                    color,
                                    opacity: "0.5",
                                  },
                                }}
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                type="text"
                                placeholder="Tu descripción aquí..."
                                disabled={isLoading}
                              />
                            </FormControl>
                          </Box>
                        </VStack>
                        <Flex
                          sx={{
                            padding: "10px",
                            bgColor: contentBgColor,
                          }}
                          justifyContent="flex-end"
                          alignItems="center"
                          gap="10px"
                        >
                          <Text
                            sx={{
                              fontWeight: "500",
                              color:
                                values.description.length > 450 ? "red" : color,
                              opacity: "0.6",
                            }}
                          >
                            {450 - values.description.length}
                          </Text>
                          <Button
                            sx={{
                              width: "fit-content",
                              padding: { base: "10px 15px", md: "10px 20px" },
                              alignSelf: "flex-end",
                            }}
                            variant="primary"
                            type="submit"
                            isLoading={isLoading}
                            disabled={isLoading || !isValid}
                          >
                            Enviar
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

NewCardModal.propTypes = {
  onCreatedPost: PropTypes.func,
  onCreatingPost: PropTypes.func,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

NewCardModal.defaultProps = {
  onCreatedPost: undefined,
  onCreatingPost: undefined,
  openModal: undefined,
  onCloseModal: undefined,
};

export default NewCardModal;
