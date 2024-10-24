import MainBoxCss from './MainBox.module.css';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const MainBox = () => {
	return (
		<main className={MainBoxCss.main}>
			<div className={`${MainBoxCss.container} container`}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</main>
	);
};

export default MainBox;
