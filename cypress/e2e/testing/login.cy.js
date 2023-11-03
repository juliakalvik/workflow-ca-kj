describe('Loggin', () => {
    it('the user can logg in', () => {
      cy.visit('https://incredible-cassata-878ab6.netlify.app/Login');
      cy.get('[data-bs-target="button"]').should('be.visible');
      cy.get('#loginEmail').should('be.visible');
      cy.type('Mirmir2023@stud.noroff.no');
    cy.get("input[type='password']:visible")
      .should('exist')
    cy.url().should('include', 'profile');


