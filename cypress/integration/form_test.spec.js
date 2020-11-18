describe("Form", () => {
  it("When visit the home page, the form becomes visible", () => {
    cy.visit("http://localhost:9000/");
    cy.get("[data-hook=mainForm]").should("be.visible");
  });

  it("When enter a value in the origin city autofill this autofill is displayed and has the value you entered", () => {
    cy.get("[data-hook=autocompleteOrigin]").as("autocompleteOrigin");

    cy.get("@autocompleteOrigin").should("be.visible");
    cy.get("@autocompleteOrigin").type("Москва");
    cy.get("@autocompleteOrigin").should("have.value", "Москва");
  });

  it("When enter a value in the destination city autofill this autofill is displayed and has the value you entered", () => {
    cy.get("[data-hook=autocompleteDestination]").as("autocompleteDestination");

    cy.get("@autocompleteDestination").should("be.visible");
    cy.get("@autocompleteDestination").type("Казань");
    cy.get("@autocompleteDestination").should("have.value", "Казань");
  });

  it("When click the depart datepicker button it opens the datepicker modal control", () => {
    cy.get("[data-hook=datePickerDepartInput]").as("datePickerDepartInput");
    cy.get("[data-hook=datePickerDepartWrap] .datepicker-container").as(
      "modalWindow"
    );

    cy.get("@datePickerDepartInput").click();
    cy.get("@modalWindow").should("be.visible");
  });

  it("After selecting the departure date, it should be displayed in the input field in the desired format", () => {
    cy.get(
      "[data-hook=datePickerDepartWrap] .datepicker-container .is-today"
    ).as("today");
    cy.get(
      "[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat"
    ).as("modalButtons");
    cy.get("[data-hook=datePickerDepartInput]").as("datePickerDepartInput");

    cy.get("@today").click();
    cy.get("@today").should("have.class", "is-selected");
    cy.get("@modalButtons").contains("Ok").click();

    cy.get("@datePickerDepartInput").then(($input) => {
      const val = $input.val();
      // 2020-11
      expect(val).to.match(/^\d{4}-\d{2}$/);
    });
  });

  it("When select a currency from the header drop-down list, it should be changed and visible in the header", () => {
    cy.get("[data-hook=currencySelect] .dropdown-trigger").as(
      "currencyTrigger"
    );
    cy.get("[data-hook=currencySelect] .dropdown-content li").as(
      "currencyItem"
    );

    cy.get("@currencyTrigger").click();
    cy.get("@currencyItem").contains("€ Euro").click();
    cy.get("@currencyTrigger").should("have.value", "€ Euro");
  });
});
