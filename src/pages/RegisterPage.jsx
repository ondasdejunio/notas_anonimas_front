import { useEffect } from "react";
import { Heading, Text, Box, Flex, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";
import { createUser } from "../services/user";
import useToast from "../hooks/useToast";
import useLoading from "../hooks/useLoading";
import setTabTitle from "../utils/tabTitle";

const RegisterPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTabTitle("Registrarse");
  }, []);

  const initialValues = {
    username: "",
    gender: "",
    dateBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(
      "Necesitamos un nombre de usuario para ti."
    ),
    gender: Yup.string()
      .nullable()
      .required("Tu género es importante para nosotros."),
    dateBirth: Yup.date()
      .typeError("Fecha invalida.")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        "Debes tener al menos 10 años."
      ),
    email: Yup.string()
      .email("Correo inválido.")
      .required("Necesitamos tu correo."),
    password: Yup.string()
      .min(8, "Tu contraseña debe tener mínimo 8 caracteres.")
      .required("Necesitamos una contraseña para ti."),
    confirmPassword: Yup.string()
      .required("Campo requerido.")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales."),
  });

  const actions = [
    {
      id: "clear",
      name: "Limpiar",
      variant: "secondary",
    },
    {
      id: "submit",
      name: "Regístrate",
      variant: "primary",
      disabled: isLoading,
    },
  ];

  const fields = [
    {
      id: "username",
      label: "Nombre de usuario",
      placeholder: "mataperras3000",
      type: "text",
      required: true,
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "gender",
      label: "Género",
      placeholder: "Seleccionar...",
      type: "select",
      options: [
        { id: "MASCULINO", name: "Masculino" },
        { id: "FEMENINO", name: "Femenino" },
        { id: "OTRO", name: "Prefiero no decir" },
      ],
      required: true,
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "dateBirth",
      label: "Fecha de nacimiento",
      type: "date",
      grid: { base: 6 },
    },
    {
      id: "email",
      label: "Correo electrónico",
      placeholder: "jose@gmail.com",
      style: { marginTop: "20px" },
      type: "text",
      subtype: "email",
      required: true,
      grid: { base: 6 },
    },
    {
      id: "password",
      label: "Contraseña",
      type: "text",
      subtype: "password",
      required: true,
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "confirmPassword",
      label: "Confirmar contraseña",
      type: "text",
      subtype: "password",
      required: true,
      grid: { base: 6, md: 3, lg: 3 },
    },
  ].map((f) => ({ ...f, disabled: isLoading }));

  const handleSubmit = (obj) => {
    const user = { ...obj, confirmPassword: undefined };
    setIsLoading(true);
    createUser(user)
      .then((r) => {
        successToast("¡Te registraste con éxito!");
        setIsLoading(false);
        navigate("/user");
      })
      .catch((e) => {
        errorToast("Tuvimos un problema y no pudimos registrarte :(");
        console.error("Oh, tuvimos un problema registrándote...");
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
            Únete a nosotros, ¡registrate!
          </Heading>
          <Text color="gray.200">¡Haz parte de esta gran comunidad!</Text>
        </VStack>
        <Box
          sx={{
            width: { base: "100%", sm: "90%", md: "80%", lg: "70%" },
            padding: "10px",
          }}
        >
          <Form
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            actions={actions}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
