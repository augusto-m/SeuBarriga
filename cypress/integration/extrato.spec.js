///<reference types = "Cypress"/>

before('login e reset',() => {
    cy.autenthicate()

//     Cypress._.times(5, () => {
//         it.skip('massa de dados (movimentacoes)', () => {
//             cy.newMoviment("2021-02-20", "2021-02-27", ' ', '14', ' ', 'Conta para extrato')       
//         });
//     });
})



it('saldo total de uma conta', () => {
    cy.navigateBalance()
//         cy.xpath(("//*[contains(@class, 'container')]/div/div[2]/li//div/div/div[1][contains(.,'testeEach')]/small"
//         )).each(($el) => {
//             total = total + parseInt($el.text())
//         }).then(() => {
//             expect(total).to.equal(70)
//         })
});


after('logout', () => {
    cy.logout()
});

//TODO Estudar como calcular cada conta e o saldo total de todas as contas.


