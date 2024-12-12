import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ForgotPasswordCss from './ForgotPassword.module.css';
import { resetPassword } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ForgotPassword = (): React.JSX.Element => {
	const dispatch = useDispatch();

	const [inputState, setInputState] = useState<string>('');

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputState(e.target.value);
	};

	const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//@ts-ignore
		dispatch(resetPassword(inputState));
	};

	return (
		<div className={ForgotPasswordCss.container}>
			<div className={ForgotPasswordCss.formBlock}>
				<form className={ForgotPasswordCss.form} onSubmit={handleRecover}>
					<p className={`${ForgotPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
					<Input type={'text'} placeholder={'Укажите Email'} value={inputState} onChange={changeInput} />
					<Button htmlType="submit" type="primary" size="medium" extraClass={ForgotPasswordCss.button}>
						Восстановить
					</Button>
				</form>
				<div className={ForgotPasswordCss.textBlock}>
					<p className={`${ForgotPasswordCss.textCenter} text text_type_main-default text_color_inactive`}>
						Вспомнили пароль?
						<Link to={'/login'} className={ForgotPasswordCss.textSpan}>
							Войти
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
