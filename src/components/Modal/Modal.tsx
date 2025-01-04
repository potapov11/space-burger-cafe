import React, { ReactNode } from 'react';
import ModalCss from './ModalCss.module.css';
import { keyButton } from '../../utils/vars';
import ReactDOM from 'react-dom';
import { useSelector } from '../../main';
import { modalRoot } from '../../utils/vars';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverLay';

interface ModalProps {
	isModalOpen?: boolean;
	onClose: () => void;
	children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen = true, onClose, children }): React.JSX.Element | null => {
	const isloadBool = useSelector((store) => store.orderReducer.loading);

	console.log(isloadBool, '..isloadBool>>>');

	if (!modalRoot) {
		return null;
	}

	React.useEffect(() => {
		const close = (e: KeyboardEvent): void => {
			if (e.key === keyButton) {
				if (onClose) {
					onClose();
				}
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
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
		modalRoot,
	);
};

export default Modal;
