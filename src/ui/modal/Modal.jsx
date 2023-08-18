import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import PropTypes from "prop-types";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { StyledModal, Overlay, Button } from "./Modal.styles";

const ModalContext = createContext();

const Modal = ({ children }) => {
  // track which window is currently open
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  const handleOpen = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, open }) => {
  const { handleOpen } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => handleOpen(open) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

(Modal.Open = Open), (Modal.Window = Window);

Modal.propTypes = {
  children: PropTypes.node,
};

Open.propTypes = {
  children: PropTypes.node,
  open: PropTypes.string,
};

Window.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default Modal;
