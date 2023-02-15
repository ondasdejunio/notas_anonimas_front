import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
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
        icon={<AiOutlineArrowUp fontSize={20} />}
        sx={{
          position: "fixed",
          bottom: "40px",
          right: "25px",
          zIndex: 20,
          borderRadius: "0px",
        }}
        size="lg"
        onClick={() => scrollWindowToTop()}
      />
    );
  }
};
export default ScrollToTop;
