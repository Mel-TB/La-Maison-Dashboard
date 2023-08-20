import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../../features/authentication/Logout";

import { ButtonIcon } from "../button/ButtonIcon.styles";
import { StyledHeaderMenu } from "./HeaderMenu.styles";
import DarkModeToggle from "../toggle-darkMode/DarkModeToggle";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/account");
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={handleNavigate}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
