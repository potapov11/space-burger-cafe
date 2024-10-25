import React from 'react';
import ModalOverLayCss from './ModalOverLay.module.css';

const ModalOverlay = ({ onClose }) => {
	return <div className={ModalOverLayCss.modalOverlay} onClick={onClose}></div>;
};

export default ModalOverlay;
