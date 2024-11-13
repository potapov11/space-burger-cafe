import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginPageCss from './Login.module.css';

const LoginPage = () => {
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
						Вы — новый пользователь? <a className={LoginPageCss.textSpan}>Зарегистрироваться</a>
					</p>
					<p className={`${LoginPageCss.textCenter} text text_type_main-default text_color_inactive`}>
						Забыли пароль? <a className={LoginPageCss.textSpan}>Восстановить пароль</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
