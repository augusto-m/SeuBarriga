/// <reference types = "Cypress" />


before('login e reset',() => {
    cy.autenthicate()
    cy.resetAllAutomatic()
});


describe('Testes CRUD movimentacoes', () => {
    
    it('nova movimentacao', () => {
        cy.newMoviment("2021-02-20", "2021-02-27", ' ', '12', ' ', 'Conta com movimentacao')     
    });


    it('editar movimentacao', () => {
        cy.editMoviment("2021-02-20", "2021-02-27", 'movim. atual', '28', ' ', 'Conta com movimentacao', 'teste edicao', '59', 'Conta para alterar') 
    });

    //TODO Analisar como testar decimal. Bug no Cypress.

    it('excluir movimentacao', () => {
        cy.deleteMoviment('movim p/ deletar')     
    });

});


describe('Mais testes movimentacoes', () => {

    it('nova receita', () => {
        cy.newMoviment("2021-02-20", "2021-02-27", 'teste rct', '15', ' ', 'Conta com movimentacao')
        cy.validateCSSMovimentRct('teste rct', 'background-color', 'rgb(233, 241, 225)')
    });

    it('nova despesa', () => {
        cy.newMoviment("2021-02-20", "2021-02-27", 'teste dsp', '10', ' ', 'Conta com movimentacao')
        cy.validateCSSMovimentDsp('teste dsp', 'background-color', 'rgb(250, 225, 225)')
    });

    // Cypress._.times(5, () => {
    // it.only('teste repeticao', () => {
    //     cy.newMoviment("2021-02-20", "2021-02-27", 'teste rct', '15', ' ', 'Conta com movimentacao')        
    // });
    // });

    it('Campos obrigatorios nao preenchidos', () => {
        cy.fieldsNotFilledMovim('desc. moviment.')
    });
});


after('logout', () => {
    cy.logout()
});