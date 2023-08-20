import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./hooks/useLogout";

import { SpinnerMini } from "../../ui/spinner/SpinnerMini.styles";
import { ButtonIcon } from "../../ui/button/ButtonIcon.styles";

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
