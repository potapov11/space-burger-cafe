import headerCss from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
	return (
		<header className={`${headerCss.header} p-4`}>
			<div className={` ${headerCss.container} container`}>
				<div className={headerCss.nav}>
					<div className={headerCss.constructor}>
						<BurgerIcon type="primary" />
						<p className="text text_type_main-small">Конструктор</p>
					</div>
					<div className={headerCss.constructor}>
						<ListIcon type="secondary" />
						<p className="text text_type_main-small text_color_inactive">Лента заказов</p>
					</div>
				</div>
				<a className={headerCss.logoWrapper} href="#">
					<Logo />
				</a>
				<div className={headerCss.cabinet}>
					<ProfileIcon type="secondary" />
					<p className="text text_type_main-small text_color_inactive">Личный кабинет</p>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
