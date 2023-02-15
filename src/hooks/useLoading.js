import { useContext } from "react";
import { LoadingContext } from "../providers/LoadingProvider";

const useLoading = () => useContext(LoadingContext);

export default useLoading;
