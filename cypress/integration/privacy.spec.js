
// <reference types="Cypress" />

describe('Política de privacidade do CAC TAT', () => {
  Cypress._.times(5, () => {
    // Aula 7
    it('testa a página da política de privacidade de forma independente', () => {
      cy.visit('../src/privacy.html')

      cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

      cy.get('[id="title"]')
        .should('be.visible')
        .should('have.text', 'CAC TAT - Política de privacidade')

      cy.get('.privacy')
        .should('be.visible')
    })
  })
})
