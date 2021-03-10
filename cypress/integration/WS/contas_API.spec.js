///<reference types = "Cypress" />

let token

const conta = {
    nome: chance.word( {length : 7} ),
    nomeAlt: chance.word( {length : 7} )
}

describe('CRUD de contas', () => {
    
    before(() => {
        cy.getToken().then( tkn => {
            token = tkn
            cy.resetRest(token)
        })
    });


    beforeEach(() => {
        cy.resetRest(token)
    });
    
    
    it('criar conta', () => {
        cy.newAccountAPI(token, conta.nome)
    });


    it('editar conta', () => {
        cy.editAccountAPI(token, conta.nome, conta.nomeAlt)
    });

    
    it('excluir conta', () => {
        cy.deleteAccountAPI(token, conta.nome)
    });
});