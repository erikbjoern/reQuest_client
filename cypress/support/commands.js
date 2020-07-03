const stubLocation = require("../support/stubLocation");

Cypress.Commands.add("stubMain", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/requests*",
    response: "fixture:requests/list_of_requests_visitor.json",
  });
  cy.visit("/", stubLocation({ latitude: 57.71, longitude: 11.97 }));
});

Cypress.Commands.add("stubMainWithoutLocation", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/requests*",
    response: "fixture:requests/list_of_requests_visitor_no_location.json",
  });
  cy.visit("/", stubLocation({ latitude: undefined, longitude: undefined }));
});

Cypress.Commands.add("stubMainLoggedIn", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/requests*",
    response: "fixture:requests/list_of_requests.json",
  });
});

Cypress.Commands.add("login", () => {
  cy.route({
    method: "POST",
    url: "**/auth/*",
    response: "fixture:user/successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/auth/*",
    response: "fixture:user/successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });

  cy.visit("/login", stubLocation({ latitude: 57.71, longitude: 11.97 }));
  cy.get("#login-form").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit-btn").contains("Submit").click();
  });
});

Cypress.Commands.add("StubRequestPendingOffer", () => {
  cy.route({
    method: "GET",
    url: "**/my_request/requests",
    response: "fixture:requests/list_of_my_requests.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/my_request/requests/1",
    response: "fixture:requests/view_specific_request_with_pending_offers.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/my_request/requests/2",
    response: "fixture:requests/view_another_specific_request_with_offers.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "PUT",
    url: "**/offers/*",
    response: "fixture:offers/putOffer_accepted.json",
    headers: {
      uid: "me@mail.com",
    },
  });
});

Cypress.Commands.add("StubRequestUpdatedOffer", () => {
  cy.route({
    method: "GET",
    url: "**/my_request/requests",
    response: "fixture:requests/list_of_my_requests.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/my_request/requests/1",
    response: "fixture:requests/view_specific_request_with_updated_offers.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/my_request/requests/2",
    response: "fixture:requests/view_another_specific_request_with_offers.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "PUT",
    url: "**/offers/*",
    response: "fixture:offers/putOffer_accepted.json",
    headers: {
      uid: "me@mail.com",
    },
  });
});

Cypress.Commands.add("loginWithoutLocation", () => {
  cy.route({
    method: "POST",
    url: "**/auth/*",
    response: "fixture:user/successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/auth/*",
    response: "fixture:user/successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });

  cy.visit(
    "/login",
    stubLocation({ latitude: undefined, longitude: undefined })
  );
  cy.get("#login-form").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit-btn").contains("Submit").click();
  });
});

Cypress.Commands.add("StubRequestCompleted", () => {
  cy.route({
    method: "GET",
    url: "**/my_request/requests*",
    response: "fixture:requests/list_of_my_requests.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/my_request/requests/7",
    response: "fixture:requests/completed_specific_request_with_offer_7.json",
    headers: {
      uid: "me@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/my_request/requests/8",
    response: "fixture:requests/completed_specific_request_with_offer_8.json",
    headers: {
      uid: "me@mail.com",
    },
  });
});
