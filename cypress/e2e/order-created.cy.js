describe('creating order', () => {
	beforeEach(() => {
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' }).as('getUser');
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
		cy.visit('/');
		cy.wait('@getIngredients', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
		cy.wait('@getUser', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
	});

	it('should disable the create order button when the constructor contains only a bun', () => {
		// Получаем булочку и пустой контейнер конструктора
		cy.get('li').contains('Краторная булка').as('bun');
		cy.get('[data-test="constructor-target-selector"]').first().as('dropTarget');

		// Перетаскиваем булочку в пустой контейнер
		const dataTransfer = new DataTransfer();
		cy.get('@bun').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что кнопка "Оформить заказ" видима и отключена
		cy.contains('Оформить заказ').should('be.visible');
	});

	it('adds ingredients in constructor and makes order', () => {
		const dataTransfer = new DataTransfer();
		cy.wait(2000);

		// Добавляем первую булочку
		cy.get('li[class^="_ingredient"]').contains('Краторная булка').trigger('dragstart', { dataTransfer });
		cy.get('[data-test="constructor-target-selector"]').first().as('dropTarget');
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Добавляем соус
		cy.get('li[class^="_ingredient"]').contains('Соус Spicy').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что кнопка "Оформить заказ" включена и нажимаем на нее
		cy.get('button').contains('Оформить заказ').should('be.enabled').click();

		// Проверяем, что отображается идентификатор заказа
		cy.get('#modal-root', { timeout: 20000 }).should('contain', 'идентификатор заказа');

		// Нажимаем на кнопку для закрытия деталей заказа
		cy.get('#modal-root').find('svg').click();
	});
});
