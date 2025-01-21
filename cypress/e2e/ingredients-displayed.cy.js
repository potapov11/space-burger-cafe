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

		cy.get('@ingredientsScrollbar').find('ul[class*=_productsBox_]').first().as('buns');

		cy.get('@ingredientsScrollbar').find('ul[class*=_productsBox_]').eq(1).as('sauces');

		cy.get('@ingredientsScrollbar').find('ul[class*=_productsBox_]').last().as('fillings');

		cy.get('@buns').find('li[class^="_ingredient"]').should('have.length.above', 0);
		cy.get('@sauces').find('li[class^="_ingredient"]').should('have.length.above', 0);
		cy.get('@fillings').find('li[class^="_ingredient"]').should('have.length.above', 0);
	});
});
