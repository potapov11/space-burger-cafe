import { testSelectors } from '../../src/utils/vars';

describe('ingredients modal', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('opens and closes ingredient details modal by close-button click', () => {
		cy.get(testSelectors.liIngredient).contains('Краторная булка').click();
		cy.contains('Детали ингредиента');
		cy.get(testSelectors.modalIdRoot).find('svg').click({ force: true });
	});

	it('opens and closes ingredient details modal by Escape', () => {
		cy.get(testSelectors.liIngredient).contains('Краторная булка').click();
		cy.contains('Детали ингредиента');
		cy.get('body').type('{esc}');
	});

	it('opens and closes ingredient details modal by overlay click', () => {
		cy.get(testSelectors.liIngredient).contains('Краторная булка').click();
		cy.contains('Детали ингредиента');
		cy.get(testSelectors.modalIdRoot).parent().parent().click({ force: true });
	});
});
