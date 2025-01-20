import type {} from 'cypress';
import type {} from '../support/cypress';

describe('Application', () => {
    it('should shoe Deer after click on 1st element', () => {
        cy.prepare("1@1.com", "123");

        cy.get('ul li:first').first().click()
        cy.get('.popup__caption').should('have.text', 'Deer')
    })

    it('should go to login page after logout', () => {
        cy.prepare("1@1.com", "123");
        
        cy.get('.header__logout').click()
        cy.get('.auth-form').should('exist')
    })
})