import locationsInstance, { Locations } from "../locations";
import { formatDate } from "../../helpers/date";
import api, { Api } from "../../services/apiService";

const countries = [{ code: "RU", name: "Russia" }];
const cities = [{ country_code: "RU", name: "Moscow", code: "MOW" }];
const airlines = [{ country_code: "RU", name: "Pobeda", code: "PBD" }];

jest.mock("../../services/apiService", () => {
  const mockApi = {
    countries: jest.fn(() => Promise.resolve([{ code: "RU", name: "Russia" }])),
    cities: jest.fn(() =>
      Promise.resolve([{ country_code: "RU", name: "Moscow", code: "MOW" }])
    ),
    airlines: jest.fn(() =>
      Promise.resolve([{ country_code: "RU", name: "Pobeda", code: "PBD" }])
    ),
  };

  return {
    Api: jest.fn(() => mockApi),
  };
});
const apiService = new Api();

describe("Location store tests", () => {
  beforeEach(() => {
    locationsInstance.countries = locationsInstance.serializeCountries(
      countries
    );
    locationsInstance.cities = locationsInstance.serializeCities(cities);
  });
  it("Check that locationsInstance is instance of Locations class", () => {
    expect(locationsInstance).toBeInstanceOf(Locations);
  });
  it("Success Locations instance create", () => {
    const instance = new Locations(api, { formatDate });
    expect(instance.countries).toBe(null);
    expect(instance.shortCitiesList).toEqual({});
    expect(instance.formatDate).toEqual(formatDate);
  });
  it("Check that the countries are serialized correctly", () => {
    const res = locationsInstance.serializeCountries(countries);
    const expectedData = {
      RU: { code: "RU", name: "Russia" },
    };

    expect(res).toEqual(expectedData);
  });
  it("Check whether countries with invalid data are serialized correctly", () => {
    const res = locationsInstance.serializeCountries(null);
    const expectedData = {};

    expect(res).toEqual(expectedData);
  });
  it("Check that the cities are serialized correctly", () => {
    const res = locationsInstance.serializeCities(cities);
    const expectedData = {
      MOW: {
        country_code: "RU",
        name: "Moscow",
        code: "MOW",
        country_name: "Russia",
        full_name: "Moscow,Russia",
      },
    };

    expect(res).toEqual(expectedData);
  });
  it("Check that you get the city code correctly", () => {
    const res = locationsInstance.getCityNameByCode("MOW");
    expect(res).toBe("Moscow");
  });
  it("Check that the init method is called correctly", () => {
    const instance = new Locations(apiService, { formatDate });
    expect(instance.init()).resolves.toEqual([countries, cities, airlines]);
  });
});
