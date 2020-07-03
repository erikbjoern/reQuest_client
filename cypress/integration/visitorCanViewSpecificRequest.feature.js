describe("Can view details of a specific request", () => {
  describe("for everyone", () => {
    it("displays an informative message until a request has been selected", () => {
      cy.stubMain();
      cy.visit("/");
      cy.get("#about-request").should("contain", "The big idea");
    });
  });

  describe("as a visitor", () => {
    it("the contact button should be disabled when visitor is browsing", () => {
      cy.stubMain();
      cy.visit("/");
      cy.get("#request-4").click();
      cy.get("#selected-request").within(() => {
        cy.get("button").contains("contact").click()
      });
      cy.get("#message-component-send").should("not.exist")
    });
  });

  describe("as a user", () => {
    beforeEach(() => {
      cy.stubMainLoggedIn();
      cy.login();
      cy.wait(1500)
    });

    it("a request can be viewed", () => {
      cy.get("#request-1").click();
      cy.get("#selected-request").within(() => {
        cy.get("#selected-title").should("contain", "Change to winter tires");
        cy.get("#selected-description").should(
          "contain",
          "Need a hand with tyres"
        );
        cy.get("#selected-reward").should("contain", "90");
        cy.get("#selected-requester").should("contain", "someone1@email.com");
        cy.get("button").contains("contact").click()
      });
      cy.get("#message-component-send").should("be.visible");
    });

    it("a request will have contact button disabled if the user has already offered", () => {
      cy.get("#request-2").click();
      cy.get("#selected-request").within(() => {
        cy.get("#selected-title").should("contain", "Paint fences in backyard");
        cy.get("#selected-description").should(
          "contain",
          "Need a hand with painting"
        );
        cy.get("#selected-requester").should("contain", "someone2@email.com");
        cy.get("button").contains("contact").click()
      });
      cy.get("#message-component-send").should("not.exist")
    });

    it("a request will have contact button disabled if the user made the request", () => {
      cy.get("#request-3").click();
      cy.get("#selected-request").within(() => {
        cy.get("#selected-title").should("contain", "Teach me French");
        cy.get("#selected-description").should(
          "contain",
          "Need a tongue with French"
        );
        cy.get("#selected-requester").should("contain", "user@mail.com");
        cy.get("button").contains("contact").click()
      });
      cy.get("#message-component-send").should("not.exist")
    });
  });
});
