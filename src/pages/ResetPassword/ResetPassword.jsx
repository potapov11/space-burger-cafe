import { Input, ShowIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ResetPasswordCss from './ResetPasswordCss.module.css';

const ForgotPassword = () => {
	return (
		<div className={ResetPasswordCss.container}>
			<div className={ResetPasswordCss.formBlock}>
				<form className={ResetPasswordCss.form}>
					<p className={`${ResetPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
					<div className={ResetPasswordCss.block}>
						<Input type={'text'} placeholder={'Введите новый пароль'} />
						<div className={ResetPasswordCss.icon}>
							<ShowIcon />
						</div>
					</div>
					<Input type={'text'} placeholder={'Введите код из письма'} />
					<Button htmlType="button" type="primary" size="medium" extraClass={ResetPasswordCss.button}>
						Сохранить
					</Button>
				</form>
				<div className={ResetPasswordCss.textBlock}>
					<p className={`${ResetPasswordCss.textCenter} text text_type_main-default text_color_inactive`}>
						Вспомнили пароль? <a className={ResetPasswordCss.textSpan}>Войти</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
