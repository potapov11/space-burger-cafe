import { EditIcon, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfilePageCss from './Profile.module.css';

const ProfilePage = () => {
	return (
		<div className={ProfilePageCss.container}>
			<div className={ProfilePageCss.formBlock}>
				<div className={ProfilePageCss.wrapper}>
					<div className={ProfilePageCss.textBlockWrap}>
						<p className={`text text_type_main-default`}>Профиль</p>
						<p className={`text text_type_main-default`}>История заказов</p>
						<p className={`text text_type_main-default`}>Выход</p>
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
