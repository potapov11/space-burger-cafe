import MainBoxCss from './MainBox.module.css';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerMainIngredients from '../BurgerMainIngredients/BurgerMainIngredients';

const MainBox = () => {
	return (
		<main className={MainBoxCss.main}>
			<div className={`${MainBoxCss.container} container`}>
				<BurgerIngredients />
				<BurgerMainIngredients />
			</div>
		</main>
	);
};

export default MainBox;
