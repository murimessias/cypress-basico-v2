// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000

  // Aula 0
  beforeEach(() => {
    cy.visit('../src/index.html')
  })

  // Aula 1
  it('verifica o título da aplicação', () => {
    cy.title()
      .should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  // Aula 2
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

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

    cy.get('.success')
      .should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success')
      .should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('[id="firstName"]')
      .should('be.visible')
      .type('Murilo')

    cy.get('[id="lastName"]')
      .should('be.visible')
      .type('Messias')

    cy.get('[id="email"]')
      .should('be.visible')
      .type('invalid.email.com')

    const longText = 'Adipisicing ex elit magna quis laborum elit fugiat nulla cillum magna irure est. Aliqua cupidatat sit deserunt mollit ea magna consectetur minim consectetur id adipisicing labore cillum. Minim ipsum dolor et ad amet Lorem occaecat ipsum ut irure. Aliqua proident minim qui tempor deserunt. Dolor aliquip do ad veniam. Culpa proident nostrud dolore nulla irure pariatur. Laborum eiusmod ex labore esse id do incididunt exercitation nostrud do. Commodo eu do esse magna veniam sit pariatur ut.'

    cy.get('[id="open-text-area"]')
      .should('be.visible')
      .type(longText, { delay: 0 })

    cy.contains('button[type="submit"]', /enviar/i)
      .should('be.visible')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error')
      .should('not.be.visible')
  })

  it('não preenche o campo de telefone com caracteres não numéricos', () => {
    cy.get('[id="phone"]')
      .should('be.visible')
      .type('not-valid')
      .should('have.value', '')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[id="firstName"]')
      .should('be.visible')
      .type('Murilo')
      .should('have.value', 'Murilo')
      .clear()
      .should('have.value', '')

    cy.get('[id="lastName"]')
      .should('be.visible')
      .type('Messias')
      .should('have.value', 'Messias')
      .clear()
      .should('have.value', '')

    cy.get('[id="email"]')
      .should('be.visible')
      .type('valid@email.com')
      .should('have.value', 'valid@email.com')
      .clear()
      .should('have.value', '')

    cy.get('[id="phone"]')
      .should('be.visible')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('[id="firstName"]')
      .should('be.visible')
      .type('Murilo')

    cy.get('[id="lastName"]')
      .should('be.visible')
      .type('Messias')

    cy.get('[id="email"]')
      .should('be.visible')
      .type('valid@email.com')

    cy.get('[id="phone-checkbox"]')
      .should('be.visible')
      // .click()
      .check() // Aula 5

    const longText = 'Adipisicing ex elit magna quis laborum elit fugiat nulla cillum magna irure est. Aliqua cupidatat sit deserunt mollit ea magna consectetur minim consectetur id adipisicing labore cillum. Minim ipsum dolor et ad amet Lorem occaecat ipsum ut irure. Aliqua proident minim qui tempor deserunt. Dolor aliquip do ad veniam. Culpa proident nostrud dolore nulla irure pariatur. Laborum eiusmod ex labore esse id do incididunt exercitation nostrud do. Commodo eu do esse magna veniam sit pariatur ut.'

    cy.get('[id="open-text-area"]')
      .should('be.visible')
      .type(longText, { delay: 0 })

    cy.contains('button[type="submit"]', /enviar/i)
      .should('be.visible')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error')
      .should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button[type="submit"]', /enviar/i)
      .should('be.visible')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error')
      .should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success')
      .should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success')
      .should('not.be.visible')
  })

  // Aula 3
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('[id="product"]')
      .should('be.visible')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('[id="product"]')
      .should('be.visible')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('[id="product"]')
      .should('be.visible')
      .select(1)
      .should('have.value', 'blog')
  })

  // Aula 4
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .should('be.visible')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio)
          .check()
          .should('be.checked')
      })
  })

  // Aula 5
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .should('be.visible')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // Aula 6
  it('seleciona um arquivo na pasta fixture', () => {
    cy.get('input[type="file"]')
      .should('be.visible')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('be.visible')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
      .should('be.visible')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  // Aula 7
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]')
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()
  })

  // Aula 8
  // INFO: Alterações nos scripts do Cypress
})
