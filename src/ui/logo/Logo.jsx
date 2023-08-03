import { Img, StyledLogo } from "./Logo.styles";

const Logo = () => {
  return (
    <StyledLogo>
      <Img
        src='/logo-basic.png'
        alt='Logo'
      />
    </StyledLogo>
  );
};

export default Logo;
