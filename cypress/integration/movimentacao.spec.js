/// <reference types = "Cypress" />

describe('Testes de movimentações', () => {
    
    before(() => {
        cy.autenthicate()
    });
    
    it('nova movimentacao', () => {
        cy.newMoviment("2021-02-20", "2021-02-27", ' ', '10', ' ', 'Conta com movimentacao')
        cy.validateToastSucess('sucesso')
          
    });
});