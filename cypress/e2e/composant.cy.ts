describe('Création d’un artiste - cas d’erreur et succès', () => {

    it('affiche un message d’erreur et un autre élément en cas de 500', () => {
        cy.intercept('POST', '**/artists', {
            statusCode: 500,
            body: { message: 'Erreur interne du serveur' }
        }).as('createArtistError');

        cy.visit('/');
        cy.contains('Créer un artiste').click();

        cy.get('#name').type('Artiste Erreur');
        cy.get('#photo').type('https://img.fake');

        cy.contains("Créer l'artiste").click();

        cy.wait('@createArtistError').its('response.statusCode').should('eq', 500);

        cy.contains("Créer l'artiste").click();

        // Vérifie message d’erreur
        cy.contains('Erreur interne du serveur').should('exist');
    })


    it('affiche un message de succès et un autre élément en cas de 201', () => {
        cy.intercept('POST', '**/artists', {
            statusCode: 200,
            body: { id: 'id123', name: 'Artiste OK', photo: 'https://img.fake' }
        }).as('createArtistSuccess');

        cy.visit('/');
        cy.contains('Créer un artiste').click();

        cy.get('#name').type('Artiste OK');
        cy.get('#photo').type('https://img.fake');

        cy.contains("Créer l'artiste").click();

        cy.wait('@createArtistSuccess').its('response.statusCode').should('eq', 200);

        // Exemple d’affichage d’un message de succès (à adapter selon ton app)
        cy.contains('Artiste ajouté avec succès').should('exist');

        // Vérifie un autre élément toujours visible (exemple : bouton ou titre)
        cy.contains('Liste des artistes').should('exist');
    });
})
