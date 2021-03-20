///<reference types = "Cypress" />

import moment from '/node_modules/moment'


let token

let mov = {
    dtTransc: (moment().add(-2, 'days').format('DD/MM/YYYY')),
    dtPagam: (moment().format('DD/MM/YYYY')),
    desc: chance.word({ length: 7}),
    inter: chance.word(),
    valor: chance.natural({ min:1, max: 100 }),
    contaNova: 'contaAPI',
    conta: 'Conta com movimentacao',
    tipoRec: 'REC',
    tipoDesp: 'DESP'
}


let movEd = {
    desc: chance.word({ length: 7 }),
    valor: chance.natural({ max: 100 })
}

before(() => {
    cy.getToken()
    .then(tnk => {
        token = tnk
    })
});

beforeEach(() => {
    cy.resetRest(token)
});


describe('Testes CRUD movimentacoes pela API', () => {
    
    it('nova movimentacao', () => {
        cy.newMovimentAPI(token, mov.contaNova, mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.tipoRec, mov.valor)  
    });

    it('editar movimentacao', () => {
        cy.editMovimentAPI(token, mov.contaNova, mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.tipoRec, mov.valor, movEd.desc, movEd.valor) 
    });

    //TODO Analisar como testar decimal. Bug no Cypress.

    it('excluir movimentacao', () => {
        cy.deleteMovimentAPI(token, mov.contaNova, mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.tipoRec, mov.valor)     
    });
});


describe('Mais testes movimentacoes', () => {

    it('nova receita', () => {
        cy.newMovimentAPI(token, mov.contaNova, mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.tipoRec, mov.valor)
    });

    it('nova despesa', () => {
        cy.newMovimentAPI(token, mov.contaNova, mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.tipoDesp, mov.valor)
    });

    it.only('Campos obrigatorios nao preenchidos', () => {
        cy.fieldsNotFilledMovimAPI(token, mov.contaNova)
    });
})