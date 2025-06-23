describe('Création d’un artiste - succès', () => {
  it('ajoute un artiste avec succès', () => {
    cy.intercept('POST', '**/artists', {
      statusCode: 200,
      body: {
        id: 'fake-id-123',
        name: 'Artiste Succès',
        photo: 'https://img.fake'
      }
    }).as('createArtistSuccess');

    cy.visit('/');
    cy.contains('Créer un artiste').click();

    cy.get('#name').type('Artiste Succès');
    cy.get('#photo').type('https://img.fake');
    cy.contains("Créer l'artiste").click();

    // Attend l’appel POST simulé
    cy.wait('@createArtistSuccess').its('response.statusCode').should('eq', 200);
  });
});