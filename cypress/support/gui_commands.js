///<reference types = "Cypress" />



//------------------------------------------------//------------------------------------------------//

// Utilitários

Cypress.Commands.add('useUrlAPI', () => {
    Cypress.config('baseUrl', Cypress.env('baseUrlAPI'))
})

Cypress.Commands.add('validateToastInfo', (mensaegemInfo) => {
    cy.get('.toast-info > .toast-message').should('be.visible').contains(mensaegemInfo)
    cy.get('.toast-close-button').should('be.visible').click({multiple: true})
})

Cypress.Commands.add('validateToastSucess', (mensagemSucesso) => {
    cy.get('.toast-success > .toast-message').should('be.visible').contains(mensagemSucesso)
    cy.get('.toast-close-button').should('be.visible').click({multiple: true})
})

Cypress.Commands.add('validateToastError', (mensagemErro) => {
    cy.get('.toast-error > .toast-message').should('be.visible').contains(mensagemErro)
    cy.get('.toast-close-button').should('be.visible').click({multiple: true})
})


//------------------------------------------------//------------------------------------------------//

// Login

Cypress.Commands.add('fillLogin', (usuario, senha) => {
    cy.get('input[data-test=email]').clear().type(usuario)
    cy.get('input[data-test=passwd]').clear().type(senha)
})


Cypress.Commands.add('autenthicate', () => {
    cy.visit('')
    cy.fillLogin(Cypress.env('username'), Cypress.env('password'))
    cy.get('.btn').click()
})


Cypress.Commands.add('autenthicateFail', (usuario, senha) => {
    cy.visit('')
    cy.fillLogin(usuario, senha)
    cy.get('.btn').click()
})


//------------------------------------------------//------------------------------------------------//

// Contas

Cypress.Commands.add('navigateAccount', () => {
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()
})

Cypress.Commands.add('newAccount', (nomeConta, mensaegemInfo) => {
    cy.navigateAccount()
    cy.fillAccount(nomeConta)
    cy.validateToastSucess(mensaegemInfo)
})

Cypress.Commands.add('fillAccount', (nomeConta) => {
    cy.get('input[data-test="nome"]').clear().type(nomeConta)
    cy.get('.btn').should('be.visible').click()
})

Cypress.Commands.add('editAccount', (contaEditar, novaConta, mensagemSucesso) => {
    cy.navigateAccount()
    cy.xpath(("//table//td[contains(.,'") + contaEditar + ("')]/..//i[@class='far fa-edit']")).click()
    cy.fillAccount(novaConta)
    cy.validateToastSucess(mensagemSucesso)
})


Cypress.Commands.add('deleteAccount', (contaExcluir, mensagemSucesso) => {
    cy.navigateAccount()
    cy.xpath(("//tr/td[contains(., '") + contaExcluir + ("')]/..//i[@class='far fa-trash-alt']")).click()
    cy.validateToastSucess(mensagemSucesso)
})
