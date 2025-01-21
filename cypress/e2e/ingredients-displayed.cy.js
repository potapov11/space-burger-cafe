import { testSelectors } from '../../src/utils/vars';

describe('displaying ingredients', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('displays ingredients', () => {
		cy.contains('Соберите бургер');
		cy.get('div[class*=_products_]').as('ingredientsScrollbar');
		cy.get('@ingredientsScrollbar').should('contain', 'Булки');
		cy.get('@ingredientsScrollbar').should('contain', 'Соусы');
		cy.get('@ingredientsScrollbar').should('contain', 'Начинки');

		cy.get('@ingredientsScrollbar').find(testSelectors.productBox).first().as('buns');

		cy.get('@ingredientsScrollbar').find(testSelectors.productBox).eq(1).as('sauces');

		cy.get('@ingredientsScrollbar').find(testSelectors.productBox).last().as('fillings');

		cy.get('@buns').find(testSelectors.liIngredient).should('have.length.above', 0);
		cy.get('@sauces').find(testSelectors.liIngredient).should('have.length.above', 0);
		cy.get('@fillings').find(testSelectors.liIngredient).should('have.length.above', 0);
	});
});
