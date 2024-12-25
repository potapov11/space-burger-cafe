import React from 'react';
import ProfilePageCss from './ProfileOrders.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { logOutFunc } from '../../services/actions/data-action';
import { useDispatch } from 'react-redux';
import FeedListOrders from '../../components/FeedListOrders/FeedListOrders';

const ProfileOrders = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const goToProfile = () => {
		navigate('/profile');
	};

	const logOutClick = (): void => {
		localStorage.removeItem('accessToken');
		// @ts-ignore
		dispatch(logOutFunc());
	};

	return (
		<div className={ProfilePageCss.container}>
			<div className={ProfilePageCss.formBlock}>
				<div className={ProfilePageCss.wrapper}>
					<div className={ProfilePageCss.textBlockWrap}>
						<p className={`text text_type_main-default text_color_inactive`} onClick={goToProfile}>
							Профиль
						</p>
						<p className={`text text_type_main-default ${location.pathname === '/profile/orders' ? '' : 'text_color_inactive'}`}>История заказов</p>
						<p className={`text text_type_main-default text_color_inactive`} onClick={logOutClick}>
							Выход
						</p>
					</div>

					<div className={ProfilePageCss.overflowBox}>
						<FeedListOrders />
					</div>
				</div>

				<p className={`${ProfilePageCss.textBottom} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
			</div>
		</div>
	);
};

export default ProfileOrders;
