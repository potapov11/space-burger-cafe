import React from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import RegisterPageCss from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { registerFunc } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const RegisterPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userNameState, setUserNameState] = useState<string>('');
	const [userEmailInput, setEmailInput] = useState<string>('');
	const [userPasswordInput, setUserPasswordInput] = useState<string>('');

	const handleBtnRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataRegister = {
			email: userEmailInput,
			password: userPasswordInput,
			name: userNameState,
		};
		//@ts-ignore
		dispatch(registerFunc(dataRegister));
	};

	const onClickNavigate = () => {
		navigate('/login');
	};

	const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserNameState(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmailInput(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserPasswordInput(event.target.value);
	};

	return (
		<div className={RegisterPageCss.container}>
			<div className={RegisterPageCss.formBlock}>
				<form className={RegisterPageCss.form} onSubmit={handleBtnRegister}>
					<p className={`${RegisterPageCss.textCenter} text text_type_main-default`}>Вход</p>
					<Input type={'text'} placeholder={'Имя'} value={userNameState} onChange={handleUserNameChange} />
					<EmailInput value={userEmailInput} onChange={handleEmailChange} />
					<PasswordInput value={userPasswordInput} onChange={handlePasswordChange} />
					<Button htmlType="submit" type="primary" size="large" extraClass={RegisterPageCss.button}>
						Зарегистрироваться
					</Button>
				</form>
				<div className={RegisterPageCss.textBlock}>
					<p className={`${RegisterPageCss.textCenter} text text_type_main-default text_color_inactive`}>
						Уже зарегестрированы?
						<span className={RegisterPageCss.textSpan} onClick={onClickNavigate}>
							Войти
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
