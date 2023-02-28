import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { HiUser } from "react-icons/hi";
import * as Yup from "yup";

import Form from "../components/common/Form";
import useToast from "../hooks/useToast";
import useLoading from "../hooks/useLoading";
import setTabTitle from "../utils/tabTitle";
import { updateUser } from "../services/user";
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { successToast, errorToast } = useToast();
  const { setIsAuthenticated, setUserDetails } = useAuth();
  const navigate = useNavigate();
  const authUserDetails = useAuth().userDetails;
  const [isDisabledNewPasswordFields, setIsDisabledNewPasswordFields] =
    useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const userValues = {
    gender: authUserDetails.gender || "",
    dateBirth: authUserDetails.dateBirth || "",
    email: authUserDetails.email || "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  useEffect(() => {
    setTabTitle("Usuario");
    setIsLoading(false);
  }, []);

  const validationSchema = Yup.object().shape({
    gender: Yup.string().nullable(),
    dateBirth: Yup.date()
      .typeError("Fecha invalida.")
      .required("Fecha de nacimiento requerida.")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        "Debes tener al menos 10 años."
      ),
    email: Yup.string()
      .email("Correo inválido.")
      .required("Necesitamos tu correo."),
    password: Yup.string(),
    newPassword: Yup.string().when("password", {
      is: (val) => val !== undefined,
      then: Yup.string().required("El campo es requerido."),
      otherwise: Yup.string().notRequired(),
    }),
    confirmNewPassword: Yup.string().when("password", {
      is: (val) => val !== undefined,
      then: Yup.string()
        .required("El campo es requerido.")
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Debe ser igual a la nueva contraseña."
        ),
      otherwise: Yup.string().notRequired(),
    }),
  });

  const fields = [
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
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "dateBirth",
      label: "Fecha de nacimiento",
      type: "date",
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "email",
      label: "Correo electrónico",
      placeholder: "jose@gmail.com",
      type: "text",
      subtype: "email",
      grid: { base: 6 },
    },
    {
      id: "password",
      label: "Contraseña actual",
      type: "text",
      subtype: "password",
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "newPassword",
      label: "Nueva contraseña",
      type: "text",
      subtype: "password",
      disabled: isDisabledNewPasswordFields,
      grid: { base: 6, md: 3, lg: 3 },
    },
    {
      id: "confirmNewPassword",
      label: "Confirmar nueva contraseña",
      type: "text",
      subtype: "password",
      disabled: isDisabledNewPasswordFields,
      grid: { base: 6, md: 3, lg: 3 },
    },
  ];

  const actions = [
    {
      id: "clear",
      name: "Limpiar",
      variant: "secondary",
      styles: {
        width: "fit-content",
        paddingX: "20px",
      },
      onClick: () => navigate("/user/register"),
    },
    {
      id: "submit",
      name: "Modificar",
      variant: "primary",
      styles: {
        width: "fit-content",
        paddingX: "20px",
      },
      disabled: isLoading || !isValidPassword,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserDetails({});
    navigate("/");
    successToast("¡Cierre de sesión exitoso!");
  };

  const handleSubmit = (user) => {
    setIsLoading(true);
    updateUser({
      gender: user.gender,
      email: user.email,
      password: user.password,
      newPassword: user.newPassword,
      dateBirth: user.dateBirth,
    })
      .then((r) => {
        const userModifiedDetails = { ...authUserDetails, ...r.data.user };
        successToast("¡Datos modificados!");
        localStorage.setItem("user", JSON.stringify(userModifiedDetails));
        setUserDetails(userModifiedDetails);
        setIsLoading(false);
        navigate("/");
      })
      .catch((e) => {
        const { response = null } = e;
        if (
          response &&
          (response?.status === 401 || response?.status === 400) &&
          response?.data
        ) {
          errorToast(response.data);
          console.error(response.data);
        } else {
          errorToast("Oops, tuvimos un problema modificando tus datos.");
          console.error("Oh, tuvimos un problema modificando tus datos.");
        }
        setIsLoading(false);
      });
  };

  const styles = {
    direction: "row",
    gap: "7px",
  };

  const handleChangeValues = (values) => {
    const isActualPasswordNull =
      values.password === null || values.password === "";
    const isNewPasswordNull =
      values.newPassword === null || values.newPassword === "";
    const isConfirmNewPasswordNull =
      values.confirmNewPassword === null || values.confirmNewPassword === "";

    if (!isActualPasswordNull) {
      setIsDisabledNewPasswordFields(false);
    } else {
      setIsDisabledNewPasswordFields(true);
      if (!isNewPasswordNull || !isConfirmNewPasswordNull) {
        setIsValidPassword(false);
      } else {
        setIsValidPassword(true);
      }
    }
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
        width={{ base: "100%", md: "70%", lg: "60%" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="30px"
      >
        <VStack spacing="10px">
          <VStack spacing="0px">
            <Text color="gray.200" fontSize={{ base: "40px", md: "70px" }}>
              <HiUser />
            </Text>
            <Heading
              as="h1"
              size={{ base: "sm", lg: "md" }}
              color="secondary.200"
              marginBottom="0px"
              fontWeight="400"
              textAlign="start"
              alignSelf="flex-start"
              flexDirection="row"
            >
              Hola, <b>{authUserDetails.username}</b>
            </Heading>
          </VStack>
          <Button variant="tertiary" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </VStack>
        <VStack
          width="100%"
          spacing="20px"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <VStack
            width="100%"
            spacing="5px"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text
              color="primary.100"
              fontWeight="500"
              fontSize={{ base: "sm", md: "lg" }}
              textAlign="start"
            >
              Tus publicaciones
            </Text>
            <Button variant="secondary" onClick={() => navigate("/user/posts")}>
              Ingresa aquí
            </Button>
          </VStack>
          <VStack
            width="100%"
            spacing="5px"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text
              color="primary.100"
              fontWeight="500"
              fontSize={{ base: "sm", md: "lg" }}
              textAlign="start"
            >
              Modifica tus datos
            </Text>
            <Form
              fields={fields}
              initialValues={userValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              actions={actions}
              styles={styles}
              onChange={handleChangeValues}
            />
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default UserPage;
