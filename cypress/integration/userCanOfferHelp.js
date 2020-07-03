describe("User can offer help", () => {
  beforeEach(() => {
    cy.server();
    cy.stubMainLoggedIn();
    cy.route({
      method: "POST",
      url: "**/offers",
      response: { message: "Your offer has been sent!" },
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.login();
    cy.wait(1500)
    cy.get("#request-1").within(() => {
      cy.get(".header").should("contain", "Change to winter tires").click();
    });
    cy.get("#contact-button").click();
  });

  describe("successfully", () => {
    it("when message is added and sent, success message is shown", () => {
      cy.get("#offerMessage")
        .should("be.visible")
        .type(
          "Im so handy. I have been handy my whole carreer. I can do anything with silver tejp. Ready when you have time. // MacGyver"
        );
      cy.wait(1000);
      cy.get("button#message-send-btn").click();
      cy.get("p#message").should("contain", "Your offer has been sent!");
    });
  });

  describe("unsucessfully ", () => {
    it("if no message is added, informational popup is shown when trying to send", () => {
      cy.get("button#message-send-btn").click();
      cy.get("#offerMessage").then(($message) => {
        expect($message[0].validationMessage).to.eq(
          "Please fill out this field."
        );
      });
    });
  });
});
