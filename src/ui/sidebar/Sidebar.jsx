import Logo from "../logo/Logo";
import MainNav from "../mainNav/MainNav";

import { StyledSidebar } from "./Sidebar.styles";

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
