///<reference types = "Cypress" />

import Chance from '/node_modules/chance'
let chance = new Chance()

import moment from '/node_modules/moment'

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

Cypress.Commands.add('resetAllAutomatic', () => {
    cy.get('[data-test=menu-settings]').should('be.visible').click()
    cy.get('[href="/reset"]').should('be.visible').click()
})

// Cypress.Commands.add('resetMovimentUI', (descMovim) => {
//     cy.navigateBalance()
//     cy.get('div[class="list-group"] > li')
//     if (cy.xpath(("//*[contains(@class, 'container')]/div/div[2]/li//div/div/div/span[contains(.,'") + descMovim + ("')]")) == "teste dsp") {
//         console.log('1')
//         //cy.xpath(("//*[contains(@class, 'container')]/div/div[2]/li//div/div/div/span[contains(.,'") + descMovim + ("')]/../../../div[2]/i[contains(@class, 'far')]")).click()  
//     }
//     else {
//         console.log('2')

//     }
// })

//TODO Deletar X que nao tenham as descricoes X, Y, Z


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

Cypress.Commands.add('logout', () => {
    cy.get('[data-test=menu-settings]').should('be.visible').click()
    cy.get('[href="/logout"]').should('be.visible').click()
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
    cy.xpath((`//table//td[contains(.,'${contaEditar}')]/..//i[@class='far fa-edit']`)).click()
    cy.fillAccount(novaConta)
    cy.validateToastSucess(mensagemSucesso)
})

Cypress.Commands.add('deleteAccount', (contaExcluir, mensagemSucesso) => {
    cy.navigateAccount()
    cy.xpath((`//tr/td[contains(., '${contaExcluir}')]/..//i[@class='far fa-trash-alt']`)).click()
    cy.validateToastSucess(mensagemSucesso)
})


//------------------------------------------------//------------------------------------------------//

// Movimentação

Cypress.Commands.add('navigateMoviment', () => {
    cy.get('[data-test=menu-movimentacao]').should('be.visible').click()
})

Cypress.Commands.add('navigateBalance', (dttransc) => {
    cy.get('[data-test=menu-extrato]').should('be.visible').click()
    cy.filterPeriodBalance(moment(dttransc, "YYYY/MM/DD").format("YYYY-MM"))
})

//TODO Refatorar pra pegar algum ano mes de forma mais simples, e nao passar parametro em todo metodo.


Cypress.Commands.add('filterPeriodBalance', (dttransc) => {
    cy.get('input[type="month"]').type(dttransc, '{enter}')
})


Cypress.Commands.add('newMoviment', (dttransc, dtpagam, descMovim, valor, interessado, conta) => {
    cy.navigateMoviment()
    cy.fillMoviment(dttransc, dtpagam, descMovim, valor, interessado, conta)
    cy.validateOnlyMovim(descMovim, valor, dttransc)
})

Cypress.Commands.add('fillMoviment', (dttransc, dtpagam, descMovim, valor, interessado, conta) => {
    cy.get('input[data-test="data-transacao"]').should('be.not.disabled').clear().type(dttransc)
    cy.get('input[data-test="data-pagamento"]').should('be.not.disabled').clear().type(dtpagam)
    cy.get('#descricao').should('be.visible').clear().type(descMovim)
    cy.get('input[data-test="valor"]').should('be.visible').clear().type(valor)
    cy.get('#envolvido').should('be.visible').clear().type(interessado)
    cy.get('select[data-test="conta"]').should('be.not.disabled').select(conta)
        if (descMovim.indexOf('dsp') >= 0) {
            cy.get('[data-test=tipo-despesa]').click()       
        }
            else if (descMovim.indexOf('rct') >= 0) {
        cy.get('[data-test=tipo-receita]').click()
    }
    else {
    }
    cy.get('.btn-primary').click()
})

Cypress.Commands.add('editMoviment', (dttransc, dtpagam, atualMovim, atualValor, interessado, atualConta, novaMovim, novoValor, novaConta) => {
    cy.newMoviment(dttransc, dtpagam, atualMovim, atualValor, interessado, atualConta)
    cy.navigateBalance(dttransc)
    cy.xpath((`//*[contains(@class, "container")]/div/div[2]/li//div/div/div/span[contains(.,'${atualMovim}')]/../../../div[2]/a/i[contains(@class, "fas fa-edit")]`)).should('be.visible').click()
    cy.newMoviment(dttransc, dtpagam, novaMovim, novoValor, interessado, novaConta)
    cy.validateOnlyMovim(novaMovim, novoValor, dttransc)
})

Cypress.Commands.add('deleteMoviment', (dttransc, descMovim) => {
    cy.newMoviment(dttransc, dttransc, descMovim, '10', ' ', 'Conta com movimentacao')
    cy.navigateBalance(dttransc)
    cy.xpath((`//*[contains(@class, 'container')]/div/div[2]/li//div/div/div/span[contains(.,'${descMovim}')]/../../../div[2]/i[contains(@class, 'far')]`)).click()
    cy.validateToastSucess('sucesso')
    cy.validateMovimNotExist(dttransc, descMovim)
})

Cypress.Commands.add('validateMovimNotExist', (dttransc, descMovim) => {
    cy.navigateBalance(dttransc)
    cy.get('div[class="list-group"] > li')
    .then(($elm) => {
        if ($elm.length === 0) {
            // este if é desnecessário, e foi apenas para praticar
           cy.not.contains(descMovim)
        }
            else if ($elm.length <= 1) {
            cy.get(':nth-child(1) > .row > .col-12 > :nth-child(1) > span').should('not.exist')
        }
        else {
            cy.get('div[class="list-group"] > li').should('not.contain.text', descMovim)
        }
    })
})

Cypress.Commands.add('validateCSSMovimentRct', (descMovim, propriedadeCSS, valorCSS) => {
    cy.xpath((`//*[contains(@class, 'container')]/div/div[2]/li//div/div/div/span[contains(.,'${descMovim}')]/../../../..`)).should('have.css', propriedadeCSS, valorCSS)
})

Cypress.Commands.add('validateCSSMovimentDsp', (descMovim, propriedadeCSS, valorCSS) => {
    cy.xpath((`//*[contains(@class, 'container')]/div/div[2]/li//div/div/div/span[contains(.,'${descMovim}')]/../../../..`)).should('have.css', propriedadeCSS, valorCSS)
})

Cypress.Commands.add('validateOnlyMovim', (descMovim, valor, dttransc) => {
    cy.navigateBalance(dttransc)
    cy.xpath((`//*[contains(@class, 'container')]/div/div[2]/li//div/div/div[1][contains(.,'${descMovim}')]/small`)).should('contain', valor)
})

Cypress.Commands.add('fieldsNotFilledMovim', (descMovim, dttransc) => {
    cy.navigateMoviment()
    cy.get('#descricao').should('be.visible').clear().type(descMovim)
    cy.get('.btn-primary').click()
    cy.validateToastError('Erro')
    cy.validateMovimNotExist(dttransc)
})



Cypress.Commands.add('testeChance', (descMovim) => {
    cy.autenthicate()
    cy.navigateMoviment()
    cy.get('#descricao').clear().type(descMovim)
})