describe('drag and drop', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('показывает пустой конструктор по умолчанию', () => {
		cy.contains('Перенесите сюда булки и ингредиенты');
		cy.get('button').contains('Оформить заказ').should('be.disabled');
	});

	it('показывает пустой конструктор по умолчанию', () => {
		cy.wait(2000);
		cy.contains('Перенесите сюда булки и ингредиенты', { timeout: 10000 });
		cy.get('button').contains('Оформить заказ').should('be.disabled');
	});

	it('перетаскивает ингредиенты в конструктор и увеличивает счетчик', () => {
		const dataTransfer = new DataTransfer();
		cy.wait(2000);

		// Перетаскиваем первый ингредиент
		cy.get('li').contains('Краторная булка').as('bun');

		cy.get('@bun').trigger('dragstart', { dataTransfer });
		cy.get('[data-test="constructor-target-selector"]').first().as('dropTarget');
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что счетчик увеличился
		cy.get('@bun').should('exist'); // Проверка существования элемента
		cy.get('@bun').parent().find('.counter').should('exist');
		cy.get('@bun').parent().find('.counter').should('contain', '2');
		cy.get('@dropTarget').find('.constructor-element').should('have.length', 2);
		cy.get('button').contains('Оформить заказ').should('be.enabled');

		// Перетаскиваем второй ингредиент
		cy.get('li').contains('Соус Spicy').as('sauce');
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что счетчик увеличился
		cy.get('@sauce').parent().find('.counter').should('contain', '1');
		cy.get('@dropTarget').find('.constructor-element').should('have.length', 3);

		// Перетаскиваем второй раз
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });
		cy.get('@sauce').parent().find('.counter').should('contain', '2');
		cy.get('@dropTarget').find('.constructor-element').should('have.length', 4);

		// Удаляем ингредиент
		cy.get('@dropTarget').find('span[class*="action"]').find('svg[fill="#F2F2F3"]').first().click();
		cy.get('@sauce').parent().find('.counter').should('contain', '1');
		cy.get('@dropTarget').find('.constructor-element').should('have.length', 3);
	});
});
