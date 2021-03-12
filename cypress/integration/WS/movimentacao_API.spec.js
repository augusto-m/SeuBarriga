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

//TODO refazer essas variáveis do zero (praticar Moment)

before(() => {
    cy.getToken()
    .then(tnk => {
        token = tnk
    })
});

beforeEach(() => {
    // cy.reserRest()
});


describe('Testes CRUD movimentacoes pela API', () => {
    
    it.only('nova movimentacao', () => {
        cy.newMovimentAPI(token, mov.dtTransc, mov.dtPagam, mov.desc, mov.valor, mov.inter, mov.conta, mov.valor)  
    });

    it('editar movimentacao', () => {
        cy.editMovimentAPI(mov.dtTransc, mov.dtPagam, mov.desc, mov.valor, mov.inter, mov.conta,
            movEd.desc, movEd.valor, movEd.conta) 
    });

    //TODO Analisar como testar decimal. Bug no Cypress.

    it('excluir movimentacao', () => {
        cy.deleteMovimentAPI(mov.dtTransc, mov.desc, mov.valor, mov.inter, mov.conta)     
    });

    //TODO URGENTE Analisar como movimentacao ta sendo criada, sem todos os parametros.

});


describe('Mais testes movimentacoes', () => {

    it('nova receita', () => {
        cy.newMovimentAPI(mov.dtTransc, mov.dtPagam, 'teste rct', mov.valor, mov.inter, mov.conta)
        cy.validateCSSMovimentRct('teste rct', mov.propCSS, mov.propCSSRct)
    });

    it('nova despesa', () => {
        cy.newMovimentAPI(mov.dtTransc, mov.dtPagam, 'teste dsp', mov.valor, mov.inter, mov.conta)
        cy.validateCSSMovimentDsp('teste dsp', mov.propCSS, mov.propCSSDsp)
    });

    it('Campos obrigatorios nao preenchidos', () => {
        cy.fieldsNotFilledMovimAPI(mov.desc, mov.dtTransc)
    });

})

    // Cypress._.times(5, () => {
    // it.only('teste repeticao', () => {
    //     cy.newMoviment("2021-02-20", "2021-02-27", 'teste rct', '15', ' ', 'Conta com movimentacao')        
    // });
    // });