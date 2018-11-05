// @noflow
import * as fns from "../languages";

const hotelexpress = {
  domain: "hotelexpress.kiwi.com",
  id: "hotelexpress",
  base_url: "https://hotelexpress.kiwi.com",
  company_name: "Kiwi.com",
  localization: {
    languages: {
      default: "en",
      locales: {
        cz: {
          enabled: true,
        },
        de: {
          enabled: false,
        },
        dk: {
          enabled: false,
        },
        en: {
          enabled: true,
        },
        fi: {
          enabled: false,
        },
        se: {
          enabled: false,
        },
      },
    },
    _is_endconfig: false,
  },
  affilid: "hotelexpress",
  web_title: "HotelExpress",
  name: "HotelExpress",
  web_link: "https://www.hotel-express.com/",
};
const kayakwhite = {
  domain: "manage.kayak.com",
  id: "kayakwhite",
  base_url: "https://manage.kayak.com",
  company_name: "KAYAK",
  localization: {
    languages: {
      default: "en",
      locales: {
        en: {
          enabled: true,
        },
        fi: {
          enabled: true,
        },
      },
    },
    _is_endconfig: false,
  },
  affilid: "kayakwl",
  name: "KAYAK",
  web_link: "https://kayak.com",
};
const newkiwicom = {
  domain: "kiwis.com",
  id: "newkiwicom",
  base_url: "https://www.kiwi.com",
  localization: {
    languages: {
      default: "en",
      locales: {
        cz: {
          enabled: true,
        },
        de: {
          enabled: true,
        },
        dk: {
          enabled: true,
        },
        en: {
          enabled: true,
        },
        fi: {
          enabled: true,
        },
        se: {
          enabled: true,
        },
      },
    },
    _is_endconfig: false,
  },
  affilid: "skypicker",
  name: "Kiwi.com",
  web_link: "https://www.kiwi.com",
};

const brands = { hotelexpress, kayakwhite, newkiwicom };

const languages = {
  cz: { id: "cz", continent: "eu", defaultCountry: "cz", flag: "cz", name: "Czech" },
  de: { id: "de", continent: "eu", defaultCountry: "de", flag: "de", name: "German" },
  dk: { id: "dk", continent: "eu", defaultCountry: "dk", flag: "dk", name: "Danish" },
  en: { id: "en", continent: "eu", defaultCountry: "gb", flag: "uk", name: "English (UK)" },
  fi: { id: "fi", continent: "eu", defaultCountry: "fi", flag: "fi", name: "Finnish" },
  se: { id: "se", continent: "eu", defaultCountry: "sv", flag: "se", name: "Swedish" },
};

const countries = {
  cz: {
    id: "cz",
    continent: "eu",
    currency: "czk",
    EN: "Czech Republic",
  },
  de: { id: "de", continent: "eu", currency: "eur", EN: "Germany" },
  dk: { id: "dk", continent: "eu", currency: "dkk", EN: "Denmark" },
  fi: { id: "fi", continent: "eu", currency: "eur", EN: "Finland" },
  gb: {
    id: "gb",
    continent: "eu",
    currency: "gbp",
    EN: "United Kingdom",
  },
  se: { id: "se", continent: "eu", currency: "sek", EN: "Sweden" },
};

const brandLanguages = {
  hotelexpress: {
    continents: ["eu"],
    defaultLocale: "en",
    languages: {
      cz: { continent: "eu", defaultCountry: "cz", flag: "cz", id: "cz", name: "Czech" },
      en: { continent: "eu", defaultCountry: "gb", flag: "uk", id: "en", name: "English (UK)" },
    },
  },
  kayakwhite: {
    continents: ["eu"],
    defaultLocale: "en",
    languages: {
      en: { continent: "eu", defaultCountry: "gb", flag: "uk", id: "en", name: "English (UK)" },
      fi: { continent: "eu", defaultCountry: "fi", flag: "fi", id: "fi", name: "Finnish" },
    },
  },
  newkiwicom: {
    continents: ["eu", undefined],
    defaultLocale: "en",
    languages: {
      cz: { continent: "eu", defaultCountry: "cz", flag: "cz", id: "cz", name: "Czech" },
      de: { continent: "eu", defaultCountry: "de", flag: "de", id: "de", name: "German" },
      dk: { continent: "eu", defaultCountry: "dk", flag: "dk", id: "dk", name: "Danish" },
      en: { continent: "eu", defaultCountry: "gb", flag: "uk", id: "en", name: "English (UK)" },
      fi: { continent: "eu", defaultCountry: "fi", flag: "fi", id: "fi", name: "Finnish" },
      se: { continent: undefined, defaultCountry: "sv", flag: "se", id: "se", name: "Swedish" },
    },
  },
};
const translation = {
  "common.continents.aas": "Americas",
  "common.continents.ap": "Asia-Pacific",
  "common.continents.eu": "Europe",
  "common.continents.mea": "Middle East and Africa",
};

describe("#languages", () => {
  test("get Brand Languages", () => {
    const res = fns.getBrandLanguages(brands, languages, countries);

    expect(res).toEqual(brandLanguages);
  });

  test("translate And Sort Continents", () => {
    const res = fns.translateAndSortContinents(brandLanguages.hotelexpress, translation);

    expect(res).toEqual({
      continents: ["eu"],
      defaultLocale: "en",
      languages: {
        cz: { continent: "eu", defaultCountry: "cz", flag: "cz", id: "cz", name: "Czech" },
        en: { continent: "eu", defaultCountry: "gb", flag: "uk", id: "en", name: "English (UK)" },
      },
    });
  });
});
