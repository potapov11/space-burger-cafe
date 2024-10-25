import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalCss from './ModalCss.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverLay';

const Modal = ({ isModalOpen, onClose, children }) => {
	const modalRoot = document.getElementById('modal-root');

	if (!isModalOpen) return null;

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={ModalCss.content}>
				<CloseIcon className={ModalCss.closeButton} type="primary" onClick={onClose} />
				{children}
			</div>
		</>,
		modalRoot,
	);
};

Modal.propTypes = {
	isModalOpen: PropTypes.bool,
	onClose: PropTypes.func,
	children: PropTypes.node,
};

export default Modal;
