import React from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginPageCss from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { loginFunc } from '../../services/actions/data-action';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const LoginPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//@ts-ignore
	const storeLoginSuccess = useSelector((store) => store.loginReducer.success);
	if (storeLoginSuccess) {
		navigate('/');
	}

	const [userEmailInput, setEmailInput] = useState<string>('');
	const [userPasswordInput, setUserPasswordInput] = useState<string>('');

	const onClickNavigate = async (e: React.MouseEvent<HTMLElement>) => {
		const el = e.target as HTMLElement;
		const attr = el.getAttribute('data-password');
		if (attr === 'register') {
			navigate('/register');
		}
		navigate('/forgot-password');
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataRegister = {
			email: userEmailInput,
			password: userPasswordInput,
		};

		//@ts-ignore
		dispatch(loginFunc(dataRegister));
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailInput(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserPasswordInput(e.target.value);
	};

	return (
		<div className={LoginPageCss.container}>
			<div className={LoginPageCss.formBlock}>
				<form className={LoginPageCss.form} onSubmit={handleLogin}>
					<p className={`${LoginPageCss.textCenter} text text_type_main-default`}>Вход</p>
					<EmailInput value={userEmailInput} onChange={handleEmailChange} />
					<PasswordInput value={userPasswordInput} onChange={handlePasswordChange} />
					<Button htmlType="submit" type="primary" size="medium" extraClass={LoginPageCss.button}>
						Войти
					</Button>
				</form>
				<div className={LoginPageCss.textBlock}>
					<p className={`${LoginPageCss.textCenter} text text_type_main-default text_color_inactive`}>
						Вы — новый пользователь?{' '}
						<span className={LoginPageCss.textSpan} data-password="register" onClick={(e) => onClickNavigate(e)}>
							Зарегистрироваться
						</span>
					</p>
					<p className={`${LoginPageCss.textCenter} text text_type_main-default text_color_inactive`}>
						Забыли пароль?{' '}
						<span className={LoginPageCss.textSpan} data-password="recover-password" onClick={(e) => onClickNavigate(e)}>
							Восстановить пароль
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
