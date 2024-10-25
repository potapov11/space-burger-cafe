import PropTypes from 'prop-types';
import ModalOverLayCss from './ModalOverLay.module.css';

const ModalOverlay = ({ onClose }) => {
	return <div className={ModalOverLayCss.modalOverlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func,
};

export default ModalOverlay;
