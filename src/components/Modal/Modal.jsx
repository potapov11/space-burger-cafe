import React from 'react';
import { keyButton } from '../../utils/vars';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalCss from './ModalCss.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverLay';

const Modal = ({ isModalOpen, onClose, setModalOrderOpen, setModalOpen, children }) => {
	const modalRoot = document.getElementById('modal-root');

	React.useEffect(() => {
		const close = (e) => {
			if (e.key === keyButton) {
				setModalOrderOpen(false);
				setModalOpen(false);
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

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
	setModalOrderOpen: PropTypes.func,
	setModalOpen: PropTypes.func,
};

export default Modal;
