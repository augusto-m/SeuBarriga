/// <reference types = "Cypress" />

before(() => {
    cy.visit('')    
});


beforeEach(() => {
    cy.reload()
});

it('LoginOk', () => {
    cy.authenticate(Cypress.env('username'), Cypress.env('password'))
    cy.validateToastInfo('Augusto')
    cy.logout()
});


it('usuário não existe', () => {
    cy.authenticateFail('@12121212', ' ')
    cy.validateToastError('Error: Request failed with status code 400')
});


it('usuário em branco', () => {
    cy.authenticateFail(' ', '1234')
    cy.validateToastError('Error: Request failed with status code 400')
});


it('senha errada', () => {
    cy.authenticateFail(Cypress.env('username'), '1234')
    cy.validateToastError('Error: Request failed with status code 401')
});

