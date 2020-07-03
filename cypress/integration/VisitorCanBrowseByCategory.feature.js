describe("Visitor can browse by category", () => {
  beforeEach(() => {
    cy.server();
    cy.stubMain();
  });

  it("and they should all be visible", () => {
    cy.get("#categories").within(() => {
      cy.get("#home").should("be.visible");
      cy.get("#education").should("be.visible");
      cy.get("#it").should("be.visible");
      cy.get("#vehicles").should("be.visible");
      cy.get("#other").should("be.visible");
    });
  });

  it("and they should be clickable", () => {
    cy.get("#home").click();
    cy.get("#education").click();
  });
  it("click home successfully", () => {
    cy.get("#home").click();
    cy.get("#request-2")
      .should("be.visible")
      .should("contain", "Paint fences in backyard");
    cy.get("#request-3").should("not.be.visible");
  });
});
describe("another category", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/requests*",
      response: "fixture:requests/list_of_requests_visitor_2.json",
    });
    cy.visit("/");
  });
  it("click education successfully", () => {
    cy.get("#education").click();
    cy.get("#request-4").should("be.visible");
    cy.get("#request-3").should("be.visible");
    cy.get("#request-6").should("not.be.visible");
  });
});
