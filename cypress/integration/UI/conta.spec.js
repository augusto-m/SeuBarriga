/// <reference types = "Cypress" />

let conta = {
    desc: chance.word( { length: 7 } ),
    msg: 'Conta inserida com sucesso!'
}

let contaEd = {
    desc: chance.word({ length: 7}),
    msg: 'Conta atualizada com sucesso!'
}

let contaDel = {
    msg: 'Conta excluída'
}

describe('CRUD de contas', () => {
    
    before(() => {
        cy.authenticate()
    });


    beforeEach(() => {
        cy.resetAllAutomatic()
    });
    
    
    it('criar conta', () => {
        cy.newAccount(conta.desc)
    });


    it.only('editar conta', () => {
        cy.editAccount(conta.desc, contaEd.desc)
    });

    
    it('excluir conta', () => {
        cy.deleteAccount(conta.desc, contaDel.msg)
    });
});


after('logout', () => {
    cy.logout()
});

