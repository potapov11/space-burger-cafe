import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ForgotPasswordCss from './ForgotPassword.module.css';
import { resetPassword } from '../../services/actions/data-action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const emailStore = useSelector((store) => store);

	console.log(emailStore, '...emailStore...');

	// const orderData = await dispatch(createOrder(ingredientIds));

	const [inputState, setInputState] = useState('');

	const changeInput = (e) => {
		console.log(e.target.value);
		setInputState(e.target.value);
	};

	const clickBtnRecover = async () => {
		const emailResponse = await dispatch(resetPassword(inputState));

		console.log(emailResponse, '...emailResponse...');
	};

	return (
		<div className={ForgotPasswordCss.container}>
			<div className={ForgotPasswordCss.formBlock}>
				<form className={ForgotPasswordCss.form}>
					<p className={`${ForgotPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
					<Input type={'text'} placeholder={'Укажите Email'} value={inputState} onChange={changeInput} />
					<Button htmlType="button" type="primary" size="medium" extraClass={ForgotPasswordCss.button} onClick={clickBtnRecover}>
						Восстановить
					</Button>
				</form>
				<div className={ForgotPasswordCss.textBlock}>
					<p className={`${ForgotPasswordCss.textCenter} text text_type_main-default text_color_inactive`}>
						Вспомнили пароль? <a className={ForgotPasswordCss.textSpan}>Войти</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
