import { createContext } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";

const WidthContext = createContext();

const WidthContextProvider = (props) => {
  const { children } = props;
  const [isBaseWidth] = useMediaQuery("(max-width: 768px)");
  const [isMidWith] = useMediaQuery("(max-width: 1000px)");

  return (
    <WidthContext.Provider value={{ isBaseWidth, isMidWith }}>
      {children}
    </WidthContext.Provider>
  );
};

WidthContextProvider.propTypes = {
  children: PropTypes.any,
};

WidthContextProvider.defaultProps = {
  children: undefined,
};

export { WidthContext, WidthContextProvider };
