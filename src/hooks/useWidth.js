import { useContext } from "react";
import { WidthContext } from "../providers/WidthProvider";

const useWidth = () => useContext(WidthContext);

export default useWidth;
