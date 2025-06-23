describe('Création d’un artiste - erreur serveur', () => {
  it('affiche un message d’erreur en cas de 500', () => {
    cy.intercept('POST', '**/artists', {
      statusCode: 500,
      body: { message: 'Erreur interne du serveur' }
    }).as('createArtistError')

    cy.visit('/')
    cy.contains('Créer un artiste').click()
    cy.get('#name').type('Artiste Erreur')
    cy.get('#photo').type('https://img.fake')
    cy.contains("Créer l'artiste").click()

    cy.wait('@createArtistError').its('response.statusCode').should('eq', 500)
    
    cy.contains("Créer l'artiste").click()

    cy.contains('Erreur interne du serveur').should('exist')
  })
})
