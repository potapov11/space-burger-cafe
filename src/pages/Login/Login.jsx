import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginPageCss from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();

	const onClickNavigate = (e) => {
		const attr = e.target.getAttribute('data-password');
		if (attr === 'register') {
			navigate('/register');
		}
		navigate('/forgot-password');
	};

	return (
		<div className={LoginPageCss.container}>
			<div className={LoginPageCss.formBlock}>
				<form className={LoginPageCss.form}>
					<p className={`${LoginPageCss.textCenter} text text_type_main-default`}>Вход</p>
					<EmailInput />
					<PasswordInput />
					<Button htmlType="button" type="primary" size="medium" extraClass={LoginPageCss.button}>
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
