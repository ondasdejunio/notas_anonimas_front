import { Outlet } from "react-router-dom";
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";

import HeaderApp from "./components/layout/HeaderApp";
import FooterApp from "./components/layout/FooterApp";
import { LoginModalContextProvider } from "./providers/LoginModalProvider";
import useData from "./hooks/useData";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { listRef } = useData();

  return (
    <>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="flex-start"
        padding={{ base: "20px 10px", md: "30px", lg: "50px 120px" }}
        bg="primary.800"
        minH="100vh"
      >
        <Grid width="100%" alignItems="flex-start" maxWidth="container.xl">
          <GridItem h="fit-content">
            <HeaderApp />
          </GridItem>
          <GridItem width="100%" h="100%">
            <LoginModalContextProvider>
              <Box
                width="100%"
                padding={{ base: "20px 15px", md: "30px" }}
                bg="primary.500"
                minH="70vh"
                h="100%"
                borderRadius={{
                  base: "10px 10px 0px 0px",
                  md: "10px 0px 0px 0px",
                }}
                ref={listRef}
              >
                <ScrollToTop />
                <Outlet />
              </Box>
            </LoginModalContextProvider>
          </GridItem>
          <GridItem h="fit-content">
            <Box
              padding="10px"
              bg="primary.400"
              borderRadius="0px 0px 10px 10px"
            >
              <FooterApp />
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}

export default App;
