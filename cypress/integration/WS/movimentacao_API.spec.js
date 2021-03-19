///<reference types = "Cypress" />

import moment from '/node_modules/moment'


let token

let mov = {
    dtTransc: (moment().add(-2, 'days').format('DD/MM/YYYY')),
    dtPagam: (moment().format('DD/MM/YYYY')),
    desc: chance.word({ length: 7}),
    inter: chance.word(),
    valor: chance.natural({ min:1, max: 100 }),
    conta: 'Conta com movimentacao',
    propCSS: 'background-color',
    propCSSRct: 'rgb(233, 241, 225)',
    propCSSDsp: 'rgb(250, 225, 225)'
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
        cy.newMovimentAPI(token, 'contaAPI', mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.valor)  
    });

    it.only('editar movimentacao', () => {
        cy.editMovimentAPI(token, 'contaAPI', mov.dtTransc, mov.dtPagam, mov.desc, mov.inter, mov.valor, movEd.desc, movEd.valor) 
    });

    //TODO Analisar como testar decimal. Bug no Cypress.

    it('excluir movimentacao', () => {
        // cy.deleteMovimentAPI(mov.dtTransc, mov.desc, mov.valor, mov.inter, mov.conta)     
    });

    //TODO URGENTE Analisar como movimentacao ta sendo criada, sem todos os parametros.

});


describe('Mais testes movimentacoes', () => {

    it('nova receita', () => {
        // cy.newMovimentAPI(mov.dtTransc, mov.dtPagam, 'teste rct', mov.valor, mov.inter, mov.conta)
        // cy.validateCSSMovimentRct('teste rct', mov.propCSS, mov.propCSSRct)
    });

    it('nova despesa', () => {
        // cy.newMovimentAPI(mov.dtTransc, mov.dtPagam, 'teste dsp', mov.valor, mov.inter, mov.conta)
        // cy.validateCSSMovimentDsp('teste dsp', mov.propCSS, mov.propCSSDsp)
    });

    it('Campos obrigatorios nao preenchidos', () => {
        // cy.fieldsNotFilledMovimAPI(mov.desc, mov.dtTransc)
    });

    // Cypress._.times(5, () => {
    // it.only('teste repeticao', () => {
    //     cy.newMoviment("2021-02-20", "2021-02-27", 'teste rct', '15', ' ', 'Conta com movimentacao')        
    // });
    // });
})