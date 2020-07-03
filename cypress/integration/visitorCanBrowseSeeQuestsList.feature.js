describe("Visitor can view all listed requests", () => {
  beforeEach(() => {
    cy.stubMain();
  });
  it("reQuests are shown", () => {
    cy.get("#request-1").within(() => {
      cy.get("div.header").should("contain", "Change to winter tires");
      cy.get("#distance").should("contain", "1.2 km");
    });

    cy.get("#request-2").within(() => {
      cy.get("div.header").should("contain", "Paint fences in backyard");
      cy.get("#distance").should("contain", "0.4 km");
    });
  });
});

describe("visitor who refuses to share location", () => {
  it("will not see distance information'", () => {
    cy.stubMainWithoutLocation();
    cy.get("#request-1").within(() => {
      cy.get("div.header").should("contain", "Change to winter tires");
      cy.get("#distance").should("not.visible")
    });

    cy.get("#request-2").within(() => {
      cy.get("div.header").should("contain", "Paint fences in backyard");
      cy.get("#distance").should("not.visible")
    });
  });
 })