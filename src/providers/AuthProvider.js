import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const { children } = props;
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (token) {
      return true;
    }
    return false;
  });
  const [userDetails, setUserDetails] = useState(user);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};

AuthContextProvider.defaultProps = {
  children: undefined,
};

export { AuthContext, AuthContextProvider };
