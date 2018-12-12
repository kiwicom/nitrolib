// @flow
export const props = {
  searchString: "search",
  language: {
    id: "us",
  },
  currency: "gbp",
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
};

export const response = [
  {
    id: "travel",
    newWindow: false,
    translation: "search.service.travel_anywhere",
    provider: "kiwi.com",
    url:
      "https://red-cougar.kiwi.com/nav-bar-link?u=TRAVEL&r=search&lang=us&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoia2l3aS5jb20gLSB0cmF2ZWwifQ==",
  },
  {
    id: "rooms",
    newWindow: true,
    translation: "search.service.rooms",
    readyUrl: { base: "ROOMS_KIWI", query: "index.html?selected_currency=EUR&headerlinks" },
    url:
      "https://red-cougar.kiwi.com/nav-bar-link?u=ROOMS_KIWI&query=aW5kZXguaHRtbD9zZWxlY3RlZF9jdXJyZW5jeT1FVVImaGVhZGVybGlua3M=&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoiUk9PTVNfS0lXSSAtIHJvb21zIn0=",
  },
  {
    id: "cars",
    newWindow: true,
    translation: "search.service.cars",
    provider: "kiwi.com",
    isoShort: true,
    isoCars: true,
    params: [{ key: "preflang", prop: "language" }, { key: "adplat", value: "headerlinks" }],
    url:
      "https://red-cougar.kiwi.com/nav-bar-link?u=CARS&query=cHJlZmxhbmc9dXMmYWRwbGF0PWhlYWRlcmxpbmtz&r=search&lang=us&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoia2l3aS5jb20gLSBjYXJzIn0=",
  },
  false,
  {
    id: "logitravel",
    newWindow: true,
    translation: "search.service.holidays",
    provider: "lastminute.com",
    params: [
      { key: "acntb", value: "DP" },
      { key: "bf_subsource", value: "-----TL0S10RR01" },
      { key: "utm_medium", value: "whitelabel" },
      { key: "utm_source", value: "kiwi" },
    ],
    url:
      "https://red-cougar.kiwi.com/nav-bar-link?u=LOGITRAVEL&query=YWNudGI9RFAmYmZfc3Vic291cmNlPS0tLS0tVEwwUzEwUlIwMSZ1dG1fbWVkaXVtPXdoaXRlbGFiZWwmdXRtX3NvdXJjZT1raXdp&r=search&lang=us&payload=eyJjYXRlZ29yeSI6Ik5hdkJhciIsInN1YkNhdGVnb3J5IjoiTGluayIsImFjdGlvbiI6IkNsaWNrIiwiZGV0YWlsIjoibGFzdG1pbnV0ZS5jb20gLSBsb2dpdHJhdmVsIn0=",
  },
];
