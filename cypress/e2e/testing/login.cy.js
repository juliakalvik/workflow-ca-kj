describe("Logging", () => {
  it("the user can log in", () => {
    cy.visit("https://incredible-cassata-878ab6.netlify.app/Login");

    // Make sure the button with [data-bs-target="button"] attribute is visible.
    cy.get('[data-bs-target="button"]').should("be.visible");

    // Make sure the input field with id "loginEmail" is visible and type in the email.
    cy.get("#loginEmail")
      .should("be.visible")
      .type("Mirmir2023@stud.noroff.no");

    // Make sure there is a visible input field with type "password" and type in the password.
    cy.get("input[type='password']:visible")
      .should("exist")
      .type("your_password_here");

    // Check if the URL includes 'profile' to ensure successful login.
    cy.url().should("include", "profile");
  });
});
