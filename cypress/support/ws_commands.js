///<reference types = "Cypress" />

import hance from '/node_modules/chance'
chance = new Chance()

//------------------------------------------------//------------------------------------------------//

// Utilitários

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
        headers: {
            Authorization: `JWT ${token}`
        },
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/reset'
    }).its('status').should('be.equal', 200)
})

//------------------------------------------------//------------------------------------------------//

// login

Cypress.Commands.add('authenticateAPI', () => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
               email: Cypress.env('username'),
               redirecionar: false,
               senha: Cypress.env('password')
        }        
    }).its('body.id').should('not.be.empty')
})

Cypress.Commands.add('getToken', () => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
               email: Cypress.env('username'),
               redirecionar: false,
               senha: Cypress.env('password')
        }        
    }).its('body.token').should('not.be.empty')
    .then (token => {
        return token
    })

})

//------------------------------------------------//------------------------------------------------//

// Contas

Cypress.Commands.add('newAccountAPI', (token, nomeConta) => {
    cy.request({
        headers: {
            Authorization: `JWT ${token}`                     
        },
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/contas',
        body: {
            nome: nomeConta
        }
    })
    .then(res => {
            expect(res.status).to.be.equals(201)
            .and.to.be.not.null
            expect(res.body).to.have.property('nome', nomeConta)
    })
    cy.validateAccountAPI(token, nomeConta)
})

Cypress.Commands.add('filterAccountAPI', (token, nomeConta) => {
    cy.request({
        headers: {
            Authorization: `JWT ${token}`
        },
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas',
        qs: {
            nome: nomeConta
        }
    })
})

Cypress.Commands.add('editAccountAPI', (token, nomeConta, nomeContaAlt ) => {
    cy.newAccountAPI(token, nomeConta)
    cy.filterAccountAPI(token, nomeConta)
    .then(res => {
        cy.request({
        method: 'PUT',
        url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
        body: {
            nome: nomeContaAlt
        },
        headers: {
            Authorization: `JWT ${token}`
        }
    }).as('response')
    cy.get('@response').its('status').should('be.equals', 200)
    cy.get('@response').its('body.nome').should('be.equals', nomeContaAlt)
    })
})

Cypress.Commands.add('deleteAccountAPI', (token, nomeConta) => {
    cy.newAccountAPI(token, nomeConta)
    cy.filterAccountAPI(token, nomeConta)
    .then(res => {
        cy.request({
            method: 'DELETE',
            url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }).as('response')
    cy.get('@response').its('status').should('be.equal', 204)
    cy.validateAccountNotExistAPI(token, nomeConta) 
})

Cypress.Commands.add('validateAccountAPI', (token, nomeConta) => {
    cy.filterAccountAPI(token, nomeConta)
   .its('body.0.nome').should('be.equal', nomeConta)
})

Cypress.Commands.add('validateAccountNotExistAPI', (token, nomeConta) => {
    cy.filterAccountAPI(token, nomeConta)
    .its('body.length').should('be.equal', 0)
})


//------------------------------------------------//------------------------------------------------//

// Movimentações

Cypress.Commands.add('newMovimentAPI', (token, nomeConta, dtTransc, dtPagam, descMovim, inter, valor) => {
    cy.newAccountAPI(token, nomeConta)
    cy.filterAccountAPI (token, nomeConta)
    .its('body.0.id').should('exist')
     .then(idCon => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                conta_id: idCon,
                data_pagamento: dtTransc,
                data_transacao: dtPagam,
                descricao: descMovim,
                envolvido: inter,
                status: false,
                tipo: "REC",
                valor: valor
            }
        }).as('response')
        cy.get('@response').then(
            res => {
                expect(res.body.id).to.be.exist
                expect(res.body.descricao).to.be.equal(descMovim)
            }
        )        
     })
})

//TODO colocar asserções
//TODO Refatorar ID da conta, status e e tipo.

Cypress.Commands.add('editMovimentAPI', (token, nomeConta, dtTransc, dtPagam, descMovim, inter, valor, novaDesc, novoValor) => {
    cy.newMovimentAPI(token, nomeConta, dtTransc, dtPagam, descMovim, inter, valor)
    .then( res => {
        console.log(res)
        cy.request({
            method: 'PUT',
            url: `https://barrigarest.wcaquino.me/transacoes/${res.body.id}`, 
            body: {
                conta_id: res.body.conta_id,
                data_pagamento: dtPagam,
                data_transacao: dtTransc,
                descricao: novaDesc,
                envolvido: res.body.envolvido,
                observacao: res.body.observacao,
                parcelamento_id: res.body.parcelamento_id,
                status: res.body.status,
                tipo: res.body.tipo,
                transferencia_id: res.body.transferencia_id,
                usuario_id: res.body.usuario_id,
                valor: novoValor,
            },
            headers: {
                Authorization: `JWT ${token}`
            }
        }).should((res => {
            expect(res.status).to.be.equal(200)
            expect(res.body.descricao).to.be.equals(novaDesc)
            expect(parseInt(res.body.valor)).to.be.equals(novoValor)
        }))
    })
})

Cypress.Commands.add('deleteMoviment', (dtTransc, descMovim, valor, inter, conta) => {
})

Cypress.Commands.add('validateOnlyMovim', (descMovim, valor, dtTransc) => {
})