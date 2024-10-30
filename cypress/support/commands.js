// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('[id="firstName"]')
    .should('be.visible')
    .type('Murilo')

  cy.get('[id="lastName"]')
    .should('be.visible')
    .type('Messias')

  cy.get('[id="email"]')
    .should('be.visible')
    .type('valid@email.com')

  const longText = 'Adipisicing ex elit magna quis laborum elit fugiat nulla cillum magna irure est. Aliqua cupidatat sit deserunt mollit ea magna consectetur minim consectetur id adipisicing labore cillum. Minim ipsum dolor et ad amet Lorem occaecat ipsum ut irure. Aliqua proident minim qui tempor deserunt. Dolor aliquip do ad veniam. Culpa proident nostrud dolore nulla irure pariatur. Laborum eiusmod ex labore esse id do incididunt exercitation nostrud do. Commodo eu do esse magna veniam sit pariatur ut.'

  cy.get('[id="open-text-area"]')
    .should('be.visible')
    .type(longText, { delay: 0 })

  cy.contains('button[type="submit"]', /enviar/i)
    .should('be.visible')
    .click()
})
