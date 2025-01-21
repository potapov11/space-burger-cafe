import { testSelectors } from '../../src/utils/vars';

describe('drag and drop', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('показывает пустой конструктор по умолчанию', () => {
		cy.contains('Пожалуйста, перетащите булку');
		cy.get('button').contains('Оформить заказ').should('be.disabled');
	});

	it('перетаскивает ингредиенты в конструктор и увеличивает счетчик', () => {
		const dataTransfer = new DataTransfer();
		cy.wait(2000); // ждём, чтобы приложение загрузилось

		// Перетаскиваем первый ингредиент
		cy.get('li').contains('Краторная булка').as('bun');
		cy.get('@bun').trigger('dragstart', { dataTransfer });
		cy.get('.constructor-target-selector').first().as('dropTarget'); // Замените на селектор вашего конструктора
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что счетчик увеличился
		cy.get('@bun').find('.counter-selector').should('contain', '1'); // Замените на селектор счетчика
		cy.get('@dropTarget').find('.constructor-element-selector').should('have.length', 2); // Замените на селектор элементов конструктора
		cy.get('button').contains('Оформить заказ').should('be.enabled');

		// Перетаскиваем второй ингредиент
		cy.get('li').contains('Соус Spicy').as('sauce');
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });

		// Проверяем, что счетчик увеличился
		cy.get('@sauce').find('.counter-selector').should('contain', '1');
		cy.get('@dropTarget').find('.constructor-element-selector').should('have.length', 3);

		// Перетаскиваем второй раз
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('@dropTarget').trigger('drop', { dataTransfer });
		cy.get('@sauce').find('.counter-selector').should('contain', '2');
		cy.get('@dropTarget').find('.constructor-element-selector').should('have.length', 4);

		// Удаляем ингредиент
		cy.get('@dropTarget').find('span[class*="action"]').find('svg[fill="#F2F2F3"]').first().click();
		cy.get('@sauce').find('.counter-selector').should('contain', '1');
		cy.get('@dropTarget').find('.constructor-element-selector').should('have.length', 3);
	});
});
