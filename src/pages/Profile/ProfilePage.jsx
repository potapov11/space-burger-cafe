import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfilePageCss from './Profile.module.css';
import { logOutFunc } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const [name, setName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const isActiveProfile = location.pathname === '/profile';

	const logOutClick = () => {
		dispatch(logOutFunc());
	};
	return (
		<div className={ProfilePageCss.container}>
			<div className={ProfilePageCss.formBlock}>
				<div className={ProfilePageCss.wrapper}>
					<div className={ProfilePageCss.textBlockWrap}>
						<p className={`text text_type_main-default ${isActiveProfile ? '' : 'text_color_inactive'}`}>Профиль</p>
						<p className={`text text_type_main-default text_color_inactive`}>История заказов</p>
						<p className={`text text_type_main-default text_color_inactive`} onClick={logOutClick}>
							Выход
						</p>
					</div>
					<form className={ProfilePageCss.form}>
						<Input type={'text'} placeholder={'Имя'} icon={'EditIcon'} value={name} onChange={(e) => setName(e.target.value)} />
						<Input type={'text'} placeholder={'Логин'} icon={'EditIcon'} value={login} onChange={(e) => setLogin(e.target.value)} />
						<PasswordInput icon={'EditIcon'} value={password} onChange={(e) => setPassword(e.target.value)} />
					</form>
				</div>

				<p className={`${ProfilePageCss.textBottom} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
			</div>
		</div>
	);
};

export default ProfilePage;
