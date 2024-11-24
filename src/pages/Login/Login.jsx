import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginPageCss from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { loginFunc } from '../../services/actions/data-action';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const storeLoginSuccess = useSelector((store) => store.loginReducer.success);

	if (storeLoginSuccess) {
		navigate('/');
	}

	const [userEmailInput, setEmailInput] = useState('');
	const [userPasswordInput, setUserPasswordInput] = useState('');

	const onClickNavigate = (e) => {
		const attr = e.target.getAttribute('data-password');
		if (attr === 'register') {
			navigate('/register');
		}
		navigate('/forgot-password');
	};

	const handleBtnLogin = async () => {
		const dataRegister = {
			email: userEmailInput,
			password: userPasswordInput,
		};
		dispatch(loginFunc(dataRegister));
	};

	const handleEmailChange = (event) => {
		setEmailInput(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setUserPasswordInput(event.target.value);
	};

	return (
		<div className={LoginPageCss.container}>
			<div className={LoginPageCss.formBlock}>
				<form className={LoginPageCss.form}>
					<p className={`${LoginPageCss.textCenter} text text_type_main-default`}>Вход</p>
					<EmailInput value={userEmailInput} onChange={handleEmailChange} />
					<PasswordInput value={userPasswordInput} onChange={handlePasswordChange} />
					<Button htmlType="button" type="primary" size="medium" extraClass={LoginPageCss.button} onClick={handleBtnLogin}>
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
