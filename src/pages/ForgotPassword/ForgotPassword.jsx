import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ForgotPasswordCss from './ForgotPassword.module.css';

const ForgotPassword = () => {
	return (
		<div className={ForgotPasswordCss.container}>
			<div className={ForgotPasswordCss.formBlock}>
				<form className={ForgotPasswordCss.form}>
					<p className={`${ForgotPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
					<Input type={'text'} placeholder={'Укажите Email'} />
					<Button htmlType="button" type="primary" size="medium" extraClass={ForgotPasswordCss.button}>
						Зарегистрироваться
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
