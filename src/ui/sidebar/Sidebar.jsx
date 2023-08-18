import Uploader from "../../data/Uploader";
import Logo from "../logo/Logo";
import MainNav from "../mainNav/MainNav";

import { StyledSidebar } from "./Sidebar.styles";

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSidebar>
  );
};

export default Sidebar;
