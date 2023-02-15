import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

const ToastContext = createContext();

const ToastContextProvider = (props) => {
  const { duration, position } = props;
  const toast = useToast();
  const [toastInfo, setToastInfo] = useState(null);
  const toastIdRef = useRef();

  useEffect(() => {
    if (toastInfo) {
      // Elimino última alerta si existe. Solo se renderiza una alerta al tiempo
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
      toastIdRef.current = toast({
        id: toastInfo.id,
        title: toastInfo.title || null,
        description: toastInfo.msg || "Hubo un error",
        position,
        status: toastInfo.variant,
        duration,
        isClosable: true,
        variant: "subtle",
        onCloseComplete: () => setToastInfo(null),
      });
    }
  }, [toastInfo]);

  const successToast = (msg, title) => {
    setToastInfo({ title, msg, variant: "success" });
  };
  const errorToast = (msg, title) => {
    setToastInfo({ title, msg, variant: "error" });
  };
  const warningToast = (msg, title) => {
    setToastInfo({ title, msg, variant: "warning" });
  };
  const infoToast = (msg, title) => {
    setToastInfo({ title, msg, variant: "info" });
  };

  return (
    <ToastContext.Provider
      value={{ successToast, errorToast, warningToast, infoToast }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

ToastContextProvider.propTypes = {
  duration: PropTypes.number,
  position: PropTypes.string,
  children: PropTypes.any,
};

ToastContextProvider.defaultProps = {
  duration: 7000,
  position: "bottom-right",
  children: undefined,
};

export { ToastContext, ToastContextProvider };
