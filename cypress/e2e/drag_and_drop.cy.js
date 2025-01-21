import { testSelectors } from '../../src/utils/vars';

describe('drag and drop', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('показывает пустой конструктор по умолчанию', () => {
		cy.contains('Перенесите сюда булки и ингредиенты');
		cy.get(testSelectors.orderButton).should('be.disabled');
	});

	it('показывает пустой конструктор по умолчанию', () => {
		cy.wait(2000);
		cy.contains('Перенесите сюда булки и ингредиенты', { timeout: 10000 });
		cy.get(testSelectors.orderButton).should('be.disabled');
	});

	it('перетаскивает ингредиенты в конструктор и увеличивает счетчик', () => {
		const dataTransfer = new DataTransfer();
		cy.wait(2000);

		// Перетаскиваем первый ингредиент
		cy.get(testSelectors.bun).as('bun');
		cy.get('@bun').trigger('dragstart', { dataTransfer });
		cy.get(testSelectors.constructorTarget).first().as('dropTarget');
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что счетчик увеличился
		cy.get('@bun').should('exist'); // Проверка существования элемента
		cy.get('@bun').parent().find(testSelectors.counter).should('exist');
		cy.get('@bun').parent().find(testSelectors.counter).should('contain', '2');
		cy.get('@dropTarget').find(testSelectors.constructorElement).should('have.length', 2);
		cy.get(testSelectors.orderButton).should('be.enabled');

		// Перетаскиваем второй ингредиент
		cy.get('li').contains('Соус Spicy').as('sauce');
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что счетчик увеличился
		cy.get('@sauce').parent().find(testSelectors.counter).should('contain', '1');
		cy.get('@dropTarget').find(testSelectors.constructorElement).should('have.length', 3);

		// Перетаскиваем второй раз
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });
		cy.get('@sauce').parent().find(testSelectors.counter).should('contain', '2');
		cy.get('@dropTarget').find(testSelectors.constructorElement).should('have.length', 4);

		// Удаляем ингредиент
		cy.get('@dropTarget').find('span[class*="action"]').find('svg[fill="#F2F2F3"]').first().click();
		cy.get('@sauce').parent().find(testSelectors.counter).should('contain', '1');
		cy.get('@dropTarget').find(testSelectors.constructorElement).should('have.length', 3);
	});
});
