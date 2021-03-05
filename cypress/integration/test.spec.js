///<reference types = "Cypress"/>
//import { Chance } from 'chance'
//let chance = new Chance()


const movimentacao = {
    descricao: chance.company()
}

it('Teste1', () => {
    cy.testeChance(movimentacao.descricao)
});