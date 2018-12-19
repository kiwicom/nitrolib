// @flow
export const props = {
  searchString: "Suche",
  languageId: "de",
  currencyId: "GBP",
  searchForm: {
    mode: "oneWay",
    destination: {
      type: "2",
      name: "Warsaw",
    },
    checkIn: new Date(),
    checkOut: null,
    adults: 1,
    children: 0,
  },
  splitster: {
    HEADER_LINKS_PACKAGE_PROVIDER_0: "__disabled_user_group",
    HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE_0: "show",
    HEADER_LINKS_ROOMS_PROVIDER_0: "roomsKiwiCode",
  },
};

export const response = {
  splitster: {
    HEADER_LINKS_PACKAGE_PROVIDER_0: "__disabled_user_group",
    HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE_0: "show",
    HEADER_LINKS_ROOMS_PROVIDER_0: "roomsKiwiCode",
  },
  items: [
    {
      id: "travel",
      newWindow: false,
      translation: "search.service.travel_anywhere",
      url:
        "https://red-cougar.kiwi.com/nav-bar-link?u=TRAVEL&r=search&lang=us&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoia2l3aS5jb20gLSB0cmF2ZWwifQ==",
    },
    {
      id: "rooms",
      newWindow: true,
      translation: "search.service.rooms",
      url:
        "https://red-cougar.kiwi.com/nav-bar-link?u=ROOMS_KIWI&query=aW5kZXguaHRtbD9zZWxlY3RlZF9jdXJyZW5jeT1FVVImaGVhZGVybGlua3M=&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoiUk9PTVNfS0lXSSAtIHJvb21zIn0=",
    },
    {
      id: "cars",
      newWindow: true,
      translation: "search.service.cars",
      url:
        "https://red-cougar.kiwi.com/nav-bar-link?u=CARS&query=cHJlZmxhbmc9dXMmYWRwbGF0PWhlYWRlcmxpbmtz&r=search&lang=us&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoia2l3aS5jb20gLSBjYXJzIn0=",
    },
    {
      id: "logitravel",
      newWindow: true,
      translation: "search.service.holidays",
      url:
        "https://red-cougar.kiwi.com/nav-bar-link?u=LOGITRAVEL&query=YWNudGI9RFAmYmZfc3Vic291cmNlPS0tLS0tVEwwUzEwUlIwMSZ1dG1fbWVkaXVtPXdoaXRlbGFiZWwmdXRtX3NvdXJjZT1raXdp&r=search&lang=us&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoibGFzdG1pbnV0ZS5jb20gLSBsb2dpdHJhdmVsIn0=",
    },
  ],
};
