import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../../features/authentication/UserAvatar";

import { StyledHeader } from "./Header.styles";

const Header = () => {
  return (
    <StyledHeader
      role='row'
      // $columns={columns}
    >
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
