describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/') // change URL to match your dev URL

        // Click sur le bouton de la navbar "Créer un artiste"
        cy.contains('Créer un artiste').click()

        // Vérifie que l'URL contient "/form-artist"
        cy.url().should('include', '/form-artist')

        // Prend l'input "name" via son ID et le remplit 
        cy.get('#name').type('Esquie mon ami')

        // Prend l'input "photo" via son ID et le remplit 
        cy.get('#photo').type('https://gamesolce.fr/wp-content/uploads/2025/04/img-intro-4.jpg')
        
        // Click sur le bouton "Créer l'artiste"
        cy.contains('Créer l\'artiste').click()

        // Vas sur la liste des artistes
        cy.contains('Liste des artistes').click()
        // Vérifie que l'URL contient "/liste-artistes"
        cy.url().should('include', '/liste-artistes')

        // Vérifie que l'artiste créé est présent dans la liste
        cy.contains('Esquie mon ami').should('exist')
    })
})