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
    cy.get('.toast-close-button').click({multiple: true})
})

Cypress.Commands.add('validateToastSucess', (mensagemSucesso) => {
    cy.get('.toast-success > .toast-message').should('be.visible').contains(mensagemSucesso)
    cy.get('.toast-close-button').click({multiple: true})
})

Cypress.Commands.add('validateToastAnimated', (mensagem) =>{
    cy.get('.animated > .toast-message').should('be.visible').contains(mensagem)
    cy.get('.toast-close-button').click({multiple: true})
})

Cypress.Commands.add('validateToastError', (mensagemErro) => {
    cy.get('.toast-error > .toast-message').should('be.visible').contains(mensagemErro)
    cy.get('.toast-close-button').click({multiple: true})
})

Cypress.Commands.add('resetAllAutomatic', () => {
    cy.get('[data-test=menu-settings]').should('be.visible').click()
    cy.get('[href="/reset"]').click()
})


//TODO Deletar X que nao tenham as descricoes X, Y, Z
const testeIF = 'div[class="list-group"] > li'
 
Cypress.Commands.add('DeleteMovimUI', (dtTransc) => {
    cy.navigateBalance(dtTransc)
    cy.wait(2000)
    // cy.get('div[class="list-group"] > li')
    //     .then(($el) => {
    //         if ($el === true) {
    //         console.log('nao existe')
    //         }
    //         else {
    //         console.log('existe sim')
    //         }
        // })
    if (cy.get(testeIF).should('not.exist')) {
        console.log('nao existe')
        }
        else {
        console.log('existe sim')
    }
})


//------------------------------------------------//------------------------------------------------//

// Login

Cypress.Commands.add('fillLogin', (usuario, senha) => {
    cy.get('input[data-test=email]').clear().type(usuario)
    cy.get('input[data-test=passwd]').clear().type(senha)
})

Cypress.Commands.add('authenticate', () => {
    cy.visit('')
    cy.fillLogin(Cypress.env('username'), Cypress.env('password'))
    cy.get('.btn').click()
})

Cypress.Commands.add('authenticateFail', (usuario, senha) => {
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
    cy.get('[data-test=menu-settings]').should('be.visible').click()
    cy.get('[href="/contas"]').should('be.visible').click()
})

Cypress.Commands.add('newAccount', (descConta, mensagem) => {
    cy.navigateAccount()
    cy.fillAccount(descConta)
    cy.validateAccount(descConta)
})

Cypress.Commands.add('fillAccount', (descConta) => {
    cy.get('input[data-test="nome"]').should('be.visible').clear().type(descConta)
    cy.get('.btn').click()
})

Cypress.Commands.add('editAccount', (descConta, descEd) => {
    cy.newAccount(descConta)
    cy.navigateAccount()
    cy.xpath((`//table//td[contains(.,'${descConta}')]/..//i[@class='far fa-edit']`)).click()
    cy.fillAccount(descEd)
    cy.validateAccount(descEd)
})

Cypress.Commands.add('deleteAccount', (descConta) => {
    cy.newAccount(descConta)
    cy.navigateAccount()
    cy.xpath((`//tr/td[contains(., '${descConta}')]/..//i[@class='far fa-trash-alt']`)).click()
    cy.validateAccountNotExist(descConta)
})

Cypress.Commands.add('validateAccount', (descConta) => {
    cy.navigateAccount()
    cy.get('.container').contains(descConta)
})

Cypress.Commands.add('validateAccountNotExist', (descConta) => {
    cy.navigateAccount()
    cy.get('.container').not('contains', descConta)
})



//------------------------------------------------//------------------------------------------------//

// Movimentação

Cypress.Commands.add('navigateMoviment', () => {
    cy.get('[data-test=menu-movimentacao]').should('be.visible').click()
})

Cypress.Commands.add('newMoviment', (dtTransc, dtpagam, descMovim, valor, inter, conta) => {
    cy.navigateMoviment()
    cy.fillMoviment(dtTransc, dtpagam, descMovim, valor, inter, conta)
    cy.validateOnlyMovim(descMovim, valor, dtTransc)
})

Cypress.Commands.add('fillMoviment', (dtTransc, dtpagam, descMovim, valor, inter, conta) => {
    cy.get('input[data-test="data-transacao"]').should('be.not.disabled').clear().type(dtTransc)
    cy.get('input[data-test="data-pagamento"]').should('be.not.disabled').clear().type(dtpagam)
    cy.get('#descricao').should('be.visible').clear().type(descMovim)
    cy.get('input[data-test="valor"]').should('be.visible').clear().type(valor)
    cy.get('#envolvido').should('be.visible').clear().type(inter)
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

Cypress.Commands.add('editMoviment', (dtTransc, dtpagam, atualMovim, atualValor, inter, atualConta, novaMovim, novoValor, novaConta) => {
    cy.newMoviment(dtTransc, dtpagam, atualMovim, atualValor, inter, atualConta)
    cy.navigateBalance(dtTransc)
    cy.xpath((`//*[contains(@class, "container")]/div/div[2]/li//div/div/div/span[contains(.,'${atualMovim}')]/../../../div[2]/a/i[contains(@class, "fas fa-edit")]`)).should('be.visible').click()
    cy.newMoviment(dtTransc, dtpagam, novaMovim, novoValor, inter, novaConta)
    cy.validateOnlyMovim(novaMovim, novoValor, dtTransc)
})

Cypress.Commands.add('deleteMoviment', (dtTransc, descMovim, valor, inter, conta) => {
    cy.newMoviment(dtTransc, dtTransc, descMovim, valor, inter, conta)
    cy.navigateBalance(dtTransc)
    cy.xpath((`//*[contains(@class, 'container')]/div/div[2]/li//div/div/div/span[contains(.,'${descMovim}')]/../../../div[2]/i[contains(@class, 'far')]`)).click()
    cy.validateToastSucess('sucesso')
    cy.validateMovimNotExist(dtTransc, descMovim)
})

Cypress.Commands.add('validateMovimNotExist', (dtTransc, descMovim) => {
    cy.navigateBalance(dtTransc)
    cy.get('div[class="list-group"] > li', {timeout : 3000 })
    .then(($elm) => {
        if ($elm.length === 0) {
            // este if e o timeout acima são desnecessários, e foi apenas para praticar
            cy.not.contains(descMovim)
        }
            else if ($elm.length > 0 && $elm.length <= 2) {
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

Cypress.Commands.add('validateOnlyMovim', (descMovim, valor, dtTransc) => {
    cy.navigateBalance(dtTransc)
    cy.xpath((`//*[contains(@class, 'container')]/div/div[2]/li//div/div/div[1][contains(.,'${descMovim}')]/small`)).should('contain', valor)
})

Cypress.Commands.add('fieldsNotFilledMovim', (descMovim, dtTransc) => {
    cy.navigateMoviment()
    cy.get('#descricao').should('be.visible').clear().type(descMovim)
    cy.get('.btn-primary').click()
    cy.validateToastError('Erro')
    cy.validateMovimNotExist(dtTransc)
})



//------------------------------------------------//------------------------------------------------//

// Extrato

Cypress.Commands.add('navigateBalance', (dtTransc) => {
    cy.get('[data-test=menu-extrato]').should('be.visible').click()
    cy.filterPeriodBalance(moment(dtTransc, "YYYY/MM/DD").format("YYYY-MM"))
})

Cypress.Commands.add('filterPeriodBalance', (dtTransc) => {
    cy.get('input[type="month"]').type(dtTransc, '{enter}')
})

