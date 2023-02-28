import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTopButton = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const scrollWindowToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (showTopBtn) {
    return (
      <IconButton
        icon={<AiOutlineArrowUp fontSize={25} />}
        sx={{
          position: "fixed",
          bottom: "40px",
          right: "25px",
          zIndex: 20,
          borderRadius: "0px",
          bgColor: "secondary.300",
          _hover: {
            bgColor: "secondary.100",
          },
          _active: {
            bgColor: "secondary.500",
          },
        }}
        boxShadow="lg"
        boxSize={{ base: "60px", md: "50px" }}
        onClick={() => scrollWindowToTop()}
      />
    );
  }
};
export default ScrollToTopButton;
