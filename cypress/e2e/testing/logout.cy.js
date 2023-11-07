describe("Logging", () => {
  it("the user can log in", () => {
    cy.visit("https://workflowkj.netlify.app/");

    cy.get("button.logout").click();
  });
});
