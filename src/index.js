import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

import { WidthContextProvider } from "./providers/WidthProvider";
import { ToastContextProvider } from "./providers/ToastProvider";
import Router from "./config/routes";
import theme from "./styles/theme";
import { AuthContextProvider } from "./providers/AuthProvider";
import { DataContextProvider } from "./providers/DataProvider";
import { LoadingContextProvider } from "./providers/LoadingProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LoadingContextProvider>
        <DataContextProvider>
          <AuthContextProvider>
            <ToastContextProvider>
              <WidthContextProvider>
                <Router />
              </WidthContextProvider>
            </ToastContextProvider>
          </AuthContextProvider>
        </DataContextProvider>
      </LoadingContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
