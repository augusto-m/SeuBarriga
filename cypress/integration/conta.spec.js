/// <reference types = "Cypress" />

describe('CRUD de contas', () => {
    
    let conta = {
        desc: chance.word( { length: 7 } ),
        msg: 'Conta inserida com sucesso!'
    }

    let contaEd = {
        msg: 'Conta atualizada com sucesso!'
    }

    let contaDel = {
        msg: 'Conta excluída'
    }


    before(() => {
        cy.autenthicate()
    });


    beforeEach(() => {
        cy.resetAllAutomatic()
    });
    
    
    it('criar conta', () => {
        cy.newAccount(conta.desc)
    });


    it.skip('editar conta', () => {
        // Aplicação não está mais permitindo alteração
        cy.editAccount(conta.desc, contaEd.desc, conta.msg, contaEd.msg)
    });

    
    it('excluir conta', () => {
        cy.deleteAccount(conta.desc, contaDel.msg)
    });
});


after('logout', () => {
    cy.logout()
});

