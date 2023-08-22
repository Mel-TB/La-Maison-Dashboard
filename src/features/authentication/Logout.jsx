import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { ButtonIcon } from "../../ui/button/ButtonIcon.styles";
import { SpinnerMini } from "../../ui/spinner/SpinnerMini.styles";

import { useLogout } from "./hooks/useLogout";
const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon
      onClick={logout}
      disabled={isLoading}
    >
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
