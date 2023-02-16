import { useEffect } from "react";
import { Heading, Text, Box, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Form from "../components/Form";
import { loginUser } from "../services/user";
import useToast from "../hooks/useToast";
import useLoading from "../hooks/useLoading";
import setTabTitle from "../utils/tabTitle";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { successToast, errorToast } = useToast();
  const { setIsAuthenticated, setUserDetails } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTabTitle("Iniciar sesión");
    setIsLoading(false);
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Campo requerido."),
    password: Yup.string().required("Campo requerido."),
  });

  const fields = [
    {
      id: "username",
      label: "Nombre de usuario",
      placeholder: "mataperras3000",
      type: "text",
    },
    {
      id: "password",
      label: "Contraseña",
      type: "text",
      subtype: "password",
    },
  ].map((f) => ({
    ...f,
    disabled: isLoading,
    grid: { base: 12, md: 12, lg: 12 },
  }));

  const actions = [
    {
      id: "submit",
      name: "Iniciar sesión",
      variant: "primary",
      styles: {
        width: "100%",
      },
      disabled: isLoading,
    },
    {
      id: "register",
      name: "Regístrate",
      variant: "secondary",
      styles: {
        width: "100%",
      },
      onClick: () => navigate("/user/register"),
    },
  ];

  const styles = {
    direction: "column",
    gap: "7px",
  };

  const handleSubmit = (user) => {
    setIsLoading(true);
    loginUser(user)
      .then((r) => {
        localStorage.token = `Bearer ${r.data.access_token}`;
        localStorage.setItem("user", JSON.stringify(r.data.user));
        setIsLoading(false);
        setIsAuthenticated(true);
        setUserDetails(r.data.user);
        successToast("¡Bienvenido!");
        navigate("/");
      })
      .catch((e) => {
        const { response = null } = e;
        if (response && response?.status === 401 && response?.data) {
          errorToast(response.data);
          console.error(response.data);
        } else {
          errorToast("Oops, tuvimos un problema logueandote.");
          console.error("Oh, tuvimos un problema logueandote.");
        }
        setIsLoading(false);
      });
  };

  return (
    <Flex
      width="100%"
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="100%"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="15px"
      >
        <VStack spacing="0px">
          <Heading
            as="h1"
            size={{ base: "md", lg: "lg" }}
            color="secondary.200"
            marginBottom="0px"
          >
            Inicia sesión
          </Heading>
          <Text color="gray.200">¡Te extrañamos!</Text>
        </VStack>
        <Box
          sx={{
            width: { base: "100%", sm: "90%", md: "50%", lg: "55%", xl: "40%" },
            padding: "10px",
          }}
        >
          <Form
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            actions={actions}
            styles={styles}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
