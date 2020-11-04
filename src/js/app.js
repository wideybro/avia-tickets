import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormsSubmit();
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormsSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
