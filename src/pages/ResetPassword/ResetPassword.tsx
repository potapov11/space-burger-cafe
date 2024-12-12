import React from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ResetPasswordCss from './ResetPasswordCss.module.css';
import { resetPasswordReset } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RecoverPassword = () => {
	const dispatch = useDispatch();

	const [inputPasswordState, setInputPasswordState] = useState<string>('');
	const [inputTokenState, setInputTokenState] = useState<string>('');

	const changeInputState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputPasswordState(e.target.value);
	};

	const changeInputTokenState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputTokenState(e.target.value);
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			//@ts-ignore
			resetPasswordReset({
				password: inputPasswordState,
				token: inputTokenState,
			}),
		);
	};

	return (
		<div className={ResetPasswordCss.container}>
			<div className={ResetPasswordCss.formBlock}>
				<form className={ResetPasswordCss.form} onSubmit={handleSave}>
					<p className={`${ResetPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
					<div className={ResetPasswordCss.block}>
						<PasswordInput placeholder={'Введите новый пароль'} value={inputPasswordState} onChange={changeInputState} />
					</div>
					<Input type={'text'} placeholder={'Введите код из письма'} value={inputTokenState} onChange={changeInputTokenState} />
					<Button htmlType="submit" type="primary" size="medium" extraClass={ResetPasswordCss.button}>
						Сохранить
					</Button>
				</form>
				<div className={ResetPasswordCss.textBlock}>
					<p className={`${ResetPasswordCss.textCenter} text text_type_main-default text_color_inactive`}>
						Вспомнили пароль?{' '}
						<Link to={'/login'} className={ResetPasswordCss.textSpan}>
							Войти
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecoverPassword;
