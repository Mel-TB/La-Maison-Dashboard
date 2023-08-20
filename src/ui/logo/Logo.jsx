import { useDarkMode } from "../../context/DarkModeContext";
import { Img, StyledLogo } from "./Logo.styles";

const Logo = () => {
  const { isDarkMode } = useDarkMode();

  const src = !isDarkMode ? "/logo-light-mode.png" : "/logo-dark-mode.png";

  return (
    <StyledLogo>
      <Img
        src={src}
        alt='Logo'
      />
    </StyledLogo>
  );
};

export default Logo;
