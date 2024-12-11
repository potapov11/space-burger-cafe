import React from 'react';
import ModalOverLayCss from './ModalOverLay.module.css';

const ModalOverlay = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
	return <div className={ModalOverLayCss.modalOverlay} onClick={onClose}></div>;
};

export default ModalOverlay;
