///<reference types = "Cypress"/>

import moment from '/node_modules/moment'

before('login e reset',() => {
    cy.autenthicate()

//     Cypress._.times(5, () => {
//         it.skip('massa de dados (movimentacoes)', () => {
//             cy.newMoviment("2021-02-20", "2021-02-27", ' ', '14', ' ', 'Conta para extrato')       
//         });
//     });
 })


 let ext = {
    dtTransc: (moment().format('YYYY-MM-DD')),
//    dtTranscAnt: (moment().add(-2, 'months').format('YYYY-MM-DD'))
    dtTranscAnt: (moment().format('YYYY-MM-DD'))
}

it('Deletar mov UI', () => {
    cy.DeleteMovimUI(ext.dtTranscAnt)
    
});



 it.skip('Teste Calculo Extrato', () => {
    cy.calculateBalance(ext.dtTransc)
});


 it.skip('saldo total de uma conta', () => {
    // cy.navigateBalance()
//         cy.xpath(("//*[contains(@class, 'container')]/div/div[2]/li//div/div/div[1][contains(.,'testeEach')]/small"
//         )).each(($el) => {
//             total = total + parseInt($el.text())
//         }).then(() => {
//             expect(total).to.equal(70)
//         })
});




// after('logout', () => {
//     cy.logout()
// });

//TODO Estudar como calcular cada conta e o saldo total de todas as contas.


