import { Input, ShowIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ResetPasswordCss from './ResetPasswordCss.module.css';
import { resetPasswordReset } from '../../services/actions/data-action';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RecoverPassword = () => {
	const dispatch = useDispatch();

	const [inputPasswordState, setInputPasswordState] = useState('');
	const [inputTokenState, setInputTokenState] = useState('');

	const changeInputState = (e) => {
		setInputPasswordState(e.target.value);
	};

	const changeInputTokenState = (e) => {
		setInputTokenState(e.target.value);
	};

	const clickBtnSave = () => {
		dispatch(
			resetPasswordReset({
				password: inputPasswordState,
				token: inputTokenState,
			}),
		);
	};

	return (
		<div className={ResetPasswordCss.container}>
			<div className={ResetPasswordCss.formBlock}>
				<form className={ResetPasswordCss.form}>
					<p className={`${ResetPasswordCss.textCenter} text text_type_main-default`}>Восстановление пароля</p>
					<div className={ResetPasswordCss.block}>
						<Input type={'text'} placeholder={'Введите новый пароль'} value={inputPasswordState} onChange={changeInputState} />
						<div className={ResetPasswordCss.icon}>
							<ShowIcon />
						</div>
					</div>
					<Input type={'text'} placeholder={'Введите код из письма'} value={inputTokenState} onChange={changeInputTokenState} />
					<Button htmlType="button" type="primary" size="medium" extraClass={ResetPasswordCss.button} onClick={clickBtnSave}>
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
