/// <reference types = "Cypress" />

import moment from '/node_modules/moment'

let mov = {
    dtTransc: (moment().format('YYYY-MM-DD')),
    dtPagam: (moment().add(-1, 'days').format('YYYY-MM-DD')),
    desc: chance.word({ length: 7}),
    inter: chance.word(),
    valor: chance.natural({ min:1, max: 100 }),
    conta: 'Conta com movimentacao',
    propCSS: 'background-color',
    propCSSRct: 'rgb(233, 241, 225)',
    propCSSDsp: 'rgb(250, 225, 225)'
}

let movEd = {
    desc: chance.word(),
    valor: 59,
    conta: 'Conta para alterar'
}


before('login e reset',() => {
    cy.authenticate()
});

beforeEach(() => {
    cy.resetAllAutomatic()
});


describe('Testes CRUD movimentacoes', () => {
    
    it('nova movimentacao', () => {
        cy.newMoviment(mov.dtTransc, mov.dtPagam, mov.desc, mov.valor, mov.inter, mov.conta, mov.valor)  
    });

    it('editar movimentacao', () => {
        cy.editMoviment(mov.dtTransc, mov.dtPagam, mov.desc, mov.valor, mov.inter, mov.conta,
            movEd.desc, movEd.valor, movEd.conta) 
    });

    //TODO Analisar como testar decimal. Bug no Cypress.

    it('excluir movimentacao', () => {
        cy.deleteMoviment(mov.dtTransc, mov.desc, mov.valor, mov.inter, mov.conta)     
    });

    //TODO URGENTE Analisar como movimentacao ta sendo criada, sem todos os parametros.

});


describe('Mais testes movimentacoes', () => {

    it('nova receita', () => {
        cy.newMoviment(mov.dtTransc, mov.dtPagam, 'teste rct', mov.valor, mov.inter, mov.conta)
        cy.validateCSSMovimentRct('teste rct', mov.propCSS, mov.propCSSRct)
    });

    it('nova despesa', () => {
        cy.newMoviment(mov.dtTransc, mov.dtPagam, 'teste dsp', mov.valor, mov.inter, mov.conta)
        cy.validateCSSMovimentDsp('teste dsp', mov.propCSS, mov.propCSSDsp)
    });

    it('Campos obrigatorios nao preenchidos', () => {
        cy.fieldsNotFilledMovim(mov.desc, mov.dtTransc)
    });

})

it.only('Calcular saldo das contas', () => {
    cy.calculateBalance('202103', 'Conta para saldo')
});

    // Cypress._.times(5, () => {
    // it.only('teste repeticao', () => {
    //     cy.newMoviment("2021-02-20", "2021-02-27", 'teste rct', '15', ' ', 'Conta com movimentacao')        
    // });
    // });

// after('logout', () => {
//     cy.logout()
// });