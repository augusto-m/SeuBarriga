///<reference types = "Cypress" />

let token

before(() => {
    cy.getToken()
    .then(tnk => {
        token = tnk
    })
});

beforeEach(() => {
    cy.reserRest()
});


describe('Testes CRUD movimentacoes pela API', () => {
    
    it.only('nova movimentacao', () => {
        cy.newMovimentAPI(mov.dtTransc, mov.dtPagam, mov.desc, mov.valor, mov.inter, mov.conta, mov.valor)  
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