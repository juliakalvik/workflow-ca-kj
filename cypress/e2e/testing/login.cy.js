describe('Logging', () => {
    it('the user can log in', () => {
      cy.visit('https://incredible-cassata-878ab6.netlify.app');
  
      cy.scrollTo(0, 500);
  
      // Select the button using its class name
      cy.get('button.hidden').click();
  
      // Make sure the input field with id "loginEmail" is visible and type in the email.
      cy.get('button').click();

      cy.get('img[alt="User Avatar"]').click();
  
    });
  });