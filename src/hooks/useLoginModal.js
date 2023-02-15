import { useContext } from "react";
import { LoginModalContext } from "../providers/LoginModalProvider";

const useLoginModal = () => useContext(LoginModalContext);

export default useLoginModal;
