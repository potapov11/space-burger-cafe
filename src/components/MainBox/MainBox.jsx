import MainBoxCss from './MainBox.module.css';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

const MainBox = () => {
	return (
		<main className={MainBoxCss.main}>
			<div className={`${MainBoxCss.container} container`}>
				<BurgerIngredients />
				<BurgerIngredients />
			</div>
		</main>
	);
};

export default MainBox;
