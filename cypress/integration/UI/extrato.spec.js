///<reference types = "Cypress"/>

import moment from '/node_modules/moment'

before('login e reset',() => {
    cy.authenticate()
 })


 let ext = {
    dtTransc: (moment().format('YYYY-MM-DD')),
}


after('logout', () => {
    cy.logout()
});

//TODO Estudar como calcular cada conta e o saldo total de todas as contas.


