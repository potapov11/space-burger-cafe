import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfilePageCss from './Profile.module.css';
import { logOutFunc } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const isActiveProfile = location.pathname === '/profile';

	const logOutClick = () => {
		console.log('logout');

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
						<Input type={'text'} placeholder={'Имя'} icon={'EditIcon'} />
						<Input type={'text'} placeholder={'Логин'} icon={'EditIcon'} />
						<PasswordInput icon={'EditIcon'} />
					</form>
				</div>

				<p className={`${ProfilePageCss.textBottom} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
			</div>
		</div>
	);
};

export default ProfilePage;
