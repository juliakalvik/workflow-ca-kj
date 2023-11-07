describe("Logging", () => {
  it("the user can log in", () => {
    cy.visit("https://workflowkj.netlify.app/");

    cy.scrollTo(0, 500);

    cy.get("button.login").click();

    cy.get("button").click();

    cy.get('img[alt="User Avatar"]').click();
  });
});
