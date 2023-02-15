import { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

const useData = () => useContext(DataContext);

export default useData;
