/// <reference types = "Cypress" />

describe('CRUD de contas', () => {
    
    beforeEach(() => {
        cy.autenthicate()
    });
    
    
    it('criar conta', () => {
        cy.newAccount('Caixa Econômica', 'Conta inserida com sucesso!')
    });


    it('editar conta', () => {
        cy.editAccount('Caixa', 'Banco do Brasil', 'Conta atualizada com sucesso!')
    });

    
    it('excluir conta', () => {
        cy.deleteAccount('Banco do Brasil', 'Conta excluída com sucesso!')
    });
});


