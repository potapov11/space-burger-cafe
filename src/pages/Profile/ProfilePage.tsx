import React from 'react';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfilePageCss from './Profile.module.css';
import { logOutFunc } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import FeedListOrders from '../../components/FeedListOrders/FeedListOrders';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const [name, setName] = useState<string>('');
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [isShowFeed, setishowFeed] = useState<boolean>(false);
	const isActiveProfile = isShowFeed;

	const logOutClick = (): void => {
		localStorage.removeItem('accessToken');

		//@ts-ignore
		dispatch(logOutFunc());
	};

	return (
		<div className={ProfilePageCss.container}>
			<div className={ProfilePageCss.formBlock}>
				<div className={ProfilePageCss.wrapper}>
					<div className={ProfilePageCss.textBlockWrap}>
						<p
							onClick={() => {
								setishowFeed(true);
							}}
							className={`text text_type_main-default ${isActiveProfile ? '' : 'text_color_inactive'}`}>
							Профиль
						</p>
						<p
							onClick={() => {
								setishowFeed(false);
							}}
							className={`text text_type_main-default ${!isActiveProfile ? '' : 'text_color_inactive'}`}>
							История заказов
						</p>
						<p className={`text text_type_main-default text_color_inactive`} onClick={logOutClick}>
							Выход
						</p>
					</div>

					<div className={ProfilePageCss.overflowBox}>
						{isShowFeed ? (
							<form className={ProfilePageCss.form}>
								<Input type={'text'} placeholder={'Имя'} icon={'EditIcon'} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
								<Input type={'text'} placeholder={'Логин'} icon={'EditIcon'} value={login} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} />
								<PasswordInput icon={'EditIcon'} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
							</form>
						) : (
							<FeedListOrders />
						)}
					</div>
				</div>

				<p className={`${ProfilePageCss.textBottom} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
			</div>
		</div>
	);
};

export default ProfilePage;
