import React from "react";
import { keyButton } from "../../utils/vars";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { modalRoot } from "../../utils/vars";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalCss from "./ModalCss.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverLay";

const Modal = ({ isModalOpen = true, onClose, children }) => {
  const isloadBool = useSelector((store) => store.orderReducer.loading);

  React.useEffect(() => {
    const close = (e) => {
      if (e.key === keyButton) {
        if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      {isloadBool ? (
        <p className={`${ModalCss.centered} text_type_main-medium`}>Ждем ответ...</p>
      ) : (
        <div className={ModalCss.content}>
          <CloseIcon className={ModalCss.closeButton} type="primary" onClick={onClose} />
          {children}
        </div>
      )}
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
