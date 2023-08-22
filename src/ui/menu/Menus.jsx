import { PropTypes } from "prop-types";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createContext, useContext, useEffect, useState } from "react";

import {
  StyledMenu,
  StyledButton,
  StyledList,
  StyledToggle,
} from "./Menus.styles";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");

  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {" "}
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  useEffect(() => {
    const handleScroll = () => {
      if (openId) {
        close();
        document.removeEventListener("wheel", handleScroll);
      }
    };

    if (openId) {
      document.addEventListener("wheel", handleScroll);
    }
    return () => document.removeEventListener("wheel", handleScroll);
  }, [openId, close]);

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    //* if openId = empty or different from id, open the click one (id) otherwise close it
    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useOutsideClick(close, false);

  //* Render list if openId equal to id otherwise return nothing
  if (openId !== id) {
    return null;
  }

  return createPortal(
    <StyledList
      position={position}
      ref={ref}
    >
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

Menus.propTypes = {
  children: PropTypes.node,
};

Toggle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

List.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
};

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
};

export default Menus;
