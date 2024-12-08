import headerCss from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

const AppHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isActiveProfile = location.pathname;

	const onClickNavigate = () => {
		navigate('/profile');
	};

	return (
		<header className={`${headerCss.header} p-4`}>
			<div className={headerCss.container}>
				<div className={headerCss.nav}>
					<div className={headerCss.constructor}>
						<BurgerIcon type={`${isActiveProfile === '/' ? 'primary' : 'secondary'}`} />
						<p className={`text text_type_main-small ${isActiveProfile === '/' ? '' : 'text_color_inactive'}`}>Конструктор</p>
					</div>
					<div className={headerCss.constructor}>
						<ListIcon type="secondary" />
						<p className="text text_type_main-small text_color_inactive">Лента заказов</p>
					</div>
				</div>
				<Link to={'/'} className={headerCss.logoWrapper} href="#">
					<Logo />
				</Link>
				<div className={headerCss.cabinet}>
					<ProfileIcon type="secondary" />
					<p onClick={onClickNavigate} className={`text text_type_main-small ${isActiveProfile === '/profile' ? '' : 'text_color_inactive'}`}>
						Личный кабинет
					</p>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
