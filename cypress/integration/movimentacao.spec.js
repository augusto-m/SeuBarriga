/// <reference types = "Cypress" />

import moment from '/node_modules/moment'

let mov = {
    dttrans: (moment().format('YYYY-MM-DD')),
    dtpagam: (moment().add(1, 'days').format('YYYY-MM-DD')),
    desc: 'movim. teste',
    inter: ' ',
    valor: 27,
    conta: 'Conta com movimentacao'
}

let movEdit = {
    descA: 'teste edicao1.',
    descB: 'teste edicao2.',
    valor: 59,
    conta: 'Conta para alterar'
}

let movDel = {
    desc: 'movim p/ deletar'
}



before('login e reset',() => {
    cy.autenthicate()
    cy.resetAllAutomatic()
});


describe('Testes CRUD movimentacoes', () => {
    
    it('nova movimentacao', () => {
        cy.newMoviment(mov.dttrans, mov.dtpagam, mov.desc, mov.valor, mov.inter, mov.conta, mov.valor)  
    });

    it('editar movimentacao', () => {
        cy.editMoviment(mov.dttrans, mov.dtpagam,movEdit.descA, mov.valor, mov.inter, mov.conta,
            movEdit.descB, movEdit.valor, movEdit.conta) 
    });

    //TODO Analisar como testar decimal. Bug no Cypress.

    it('excluir movimentacao', () => {
        cy.deleteMoviment(mov.dttrans, movDel.desc)     
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

    it('Campos obrigatorios nao preenchidos', () => {
        cy.fieldsNotFilledMovim('desc. moviment.', "2021-02-20")
    });


    it.skip('Teste Moment', () => {   
        cy.navigateBalance()
        cy.filterPeriodBalance(moment("20210201", "YYYY/MM/DD").format("YYYY-MM"))
    });
})

    // Cypress._.times(5, () => {
    // it.only('teste repeticao', () => {
    //     cy.newMoviment("2021-02-20", "2021-02-27", 'teste rct', '15', ' ', 'Conta com movimentacao')        
    // });
    // });

// after('logout', () => {
//     cy.logout()
// });