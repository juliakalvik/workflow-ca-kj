describe("Logging", () => {
  it("the user can log in", () => {
    cy.visit("https://workflowkj.netlify.app/");

    cy.scrollTo(0, 500);

    cy.get("button.hidden").click();

    cy.get("#email").click();
    cy.get("#email").clear().type("KJ@stud.noroff.no");
    cy.get("button").click();
  });
});
