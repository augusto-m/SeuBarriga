/// <reference types = "Cypress" />

beforeEach(() => {
    cy.visit('')
});

it('LoginOk', () => {
    cy.autenthicate(Cypress.env('username'), Cypress.env('password'))
    cy.validateToastInfo('Augusto')
});


it('usuário não existe', () => {
    cy.autenthicateFail('@12121212', ' ')
    cy.validateToastError('Error: Request failed with status code 400')
});


it('usuário em branco', () => {
    cy.autenthicateFail(' ', '1234')
    cy.validateToastError('Error: Request failed with status code 400')
});


it('senha errada', () => {
    cy.autenthicateFail(Cypress.env('username'), '1234')
    cy.validateToastError('Error: Request failed with status code 401')
});

