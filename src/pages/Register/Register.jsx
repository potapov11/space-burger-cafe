import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import RegisterPageCss from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { registerFunc } from '../../services/actions/data-action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const RegisterPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userNameState, setUserNameState] = useState('');
	const [userEmailInput, setEmailInput] = useState('');
	const [userPasswordInput, setUserPasswordInput] = useState('');

	const handleBtnRegister = async () => {
		const dataRegister = {
			email: userEmailInput,
			password: userPasswordInput,
			name: userNameState,
		};
		const registerResponse = await dispatch(registerFunc(dataRegister));

		console.log(registerResponse, '...registerResponse...');
	};

	const onClickNavigate = () => {
		navigate('/login');
	};

	const handleUserNameChange = (event) => {
		setUserNameState(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmailInput(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setUserPasswordInput(event.target.value);
	};

	return (
		<div className={RegisterPageCss.container}>
			<div className={RegisterPageCss.formBlock}>
				<form className={RegisterPageCss.form}>
					<p className={`${RegisterPageCss.textCenter} text text_type_main-default`}>Вход</p>
					<Input type={'text'} placeholder={'Имя'} value={userNameState} onChange={handleUserNameChange} />
					<EmailInput value={userEmailInput} onChange={handleEmailChange} />
					<PasswordInput value={userPasswordInput} onChange={handlePasswordChange} />
					<Button htmlType="button" type="primary" size="large" extraClass={RegisterPageCss.button} onClick={handleBtnRegister}>
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
