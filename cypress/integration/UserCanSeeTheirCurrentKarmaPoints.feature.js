describe("User can see their current karma points", () => {
  beforeEach(() => {
    cy.server();
    cy.login();
    cy.wait(1500)
    cy.get("#myrequest-home-link").click();
    cy.wait(1500)
    cy.get("#requests-link").click();
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma_points: 50 },
      headers: {
        uid: "user@mail.com",
      },
    });
  });
  it("should display users current karma points in header", () => {
    cy.get("#points-display").should("exist");
    cy.get("#karma-points-amount").should("contain", "100p");
  });
  it("should display a reduced amount after creating a request", () => {
    cy.get("#create-request-link").click();
    cy.get("#title").type("Fix my bike");
    cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
    cy.get("#reward").type("50");
    cy.get("#category").click();
    cy.get("#category > .visible > :nth-child(2)").click();
    cy.get("#submit-btn").contains("Submit").click();
    cy.get("#karma-points-amount").should("contain", "50p");
  });
});
