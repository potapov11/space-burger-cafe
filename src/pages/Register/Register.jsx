import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import RegisterPageCss from './Register.module.css';

const RegisterPage = () => {
	return (
		<div className={RegisterPageCss.container}>
			<div className={RegisterPageCss.formBlock}>
				<form className={RegisterPageCss.form}>
					<p className={`${RegisterPageCss.textCenter} text text_type_main-default`}>Вход</p>
					<Input type={'text'} placeholder={'Имя'} />
					<EmailInput />
					<PasswordInput />
					<Button htmlType="button" type="primary" size="medium" extraClass={`${RegisterPageCss.button}`}>
						Зарегистрироваться
					</Button>
				</form>
				<div className={RegisterPageCss.textBlock}>
					<p className={`${RegisterPageCss.textCenter} text text_type_main-default text_color_inactive`}>
						Уже зарегестрированы? <a className={RegisterPageCss.textSpan}>Войти</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
