// @flow strict
export type Brand = {|
  domain: string,
  home_redirect_url: string,
  communication: {|
    push_notifications_sending: {|
      filter_out: string[],
      enabled: boolean,
    |},
    newsletter: {|
      enabled: boolean,
    |},
    email_sending: {|
      support_sender_address: string,
      info_sender_address: string,
      human_resources_address: string,
      at_the_airport_address: string,
      guarantee_address: string,
      sender_name: string,
      filter_out: string[],
      main_sender_address: string,
      enabled: boolean,
      help_request_address: string,
      business_address: string,
      refund_reply_address: string,
      archive_email_proxy_list: [string, string, string, string, string, string, string, string],
      marketing_address: string,
      signing_domain: string,
      legal_address: string,
    |},
    sms_sending: {|
      twilio_number: string,
      sender_name: string,
      filter_out: string[],
      enabled: boolean,
      nexmo_number: string,
      company_name: string,
    |},
  |},
  api: {|
    helpcenter: string,
  |},
  booked_at: string,
  partner: string,
  id: string,
  support_247: boolean,
  contacts: {|
    phones: {|
      enabled: boolean,
      locales: {
        [lang: string]: {|
          number: string,
          id: string,
          native_support: string,
        |},
      },
    |},
    emails: {|
      enabled: boolean,
      locales: {
        [lang: string]: {|
          webFormAlias?: string,
          webFormEmail: string,
          id?: string,
          email?: string,
        |},
      },
    |},
    chat: {|
      enabled: boolean,
    |},
  |},
  base_url: string,
  content: {|
    eticket: {|
      credit_cards: {|
        primary_string: string,
        show_signature: boolean,
        secondary_string: string,
      |},
    |},
    media: {|
      instagram: {|
        link: string,
        enabled: boolean,
      |},
      twitter: {|
        link: string,
        enabled: boolean,
      |},
      youtube: {|
        enabled: boolean,
      |},
      linkedin: {|
        link: string,
        enabled: boolean,
      |},
      blog: {|
        enabled: boolean,
      |},
      facebook: {|
        link: string,
        enabled: boolean,
      |},
    |},
    search: {|
      sorting: {|
        enabled: boolean,
      |},
    |},
    legal: {|
      booking_agreement: {|
        t_key: string,
      |},
      cookies: {|
        t_key: string,
      |},
      terms: {|
        t_key: string,
      |},
      privacy: {|
        t_key: string,
      |},
    |},
    general: {|
      trustpilot: {|
        link: string,
        enabled: boolean,
      |},
    |},
    promotion: {|
      uber: {|
        link: string,
        code: string,
        enabled: boolean,
      |},
      mobile_apps: {|
        download: {|
          link: string,
          enabled: boolean,
        |},
        android: {|
          link: string,
          enabled: boolean,
          id: string,
        |},
        ios: {|
          link: string,
          enabled: boolean,
          id: string,
        |},
      |},
      car_rental: {|
        mail_link_base_url: string,
        mail_link: string,
        enabled: boolean,
        external: boolean,
        email_enabled: boolean,
      |},
      accommodation: {|
        mail_link_base_url: string,
        enabled: boolean,
        external: boolean,
        email_enabled: boolean,
      |},
    |},
    pages: {|
      about: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      terms: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      invite: {|
        link: string,
        enabled: boolean,
      |},
      privacy: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      top_routes: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      media: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      brand: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      faq: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      stories: {|
        link: string,
        enabled: boolean,
      |},
      branding: {|
        link: string,
        enabled: boolean,
      |},
      security: {|
        link: string,
        enabled: boolean,
      |},
      careers: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      guarantee: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
    |},
  |},
  theme: {|
    colors: {|
      "danger-900": string,
      "primary-800": string,
      "danger-300": string,
      "google-800": string,
      "accent-500": string,
      "grey-500": string,
      "danger-800": string,
      "accent-200": string,
      "success-300": string,
      "primary-900": string,
      "danger-400": string,
      "accent-100": string,
      "grey-400": string,
      "neutral-200": string,
      "neutral-500": string,
      "primary-300": string,
      "success-200": string,
      "warning-400": string,
      "grey-200": string,
      "neutral-400": string,
      "warning-500": string,
      "trip-start": string,
      "google-500": string,
      "neutral-700": string,
      "accent-800": string,
      "neutral-300": string,
      "accent-900": string,
      "neutral-600": string,
      "danger-500": string,
      "accent-300": string,
      "danger-200": string,
      "insurance-plus": string,
      "grey-700": string,
      white: string,
      "grey-900": string,
      "grey-600": string,
      "neutral-900": string,
      "facebook-500": string,
      "grey-100": string,
      "warning-300": string,
      "success-400": string,
      "warning-600": string,
      "warning-800": string,
      "facebook-600": string,
      "primary-600": string,
      "grey-800": string,
      "success-700": string,
      "warning-700": string,
      "primary-100": string,
      "neutral-100": string,
      "text-secondary": string,
      "mail-footer-500": string,
      "success-100": string,
      "warning-100": string,
      "mail-button-500": string,
      "google-600": string,
      "primary-400": string,
      "success-900": string,
      "warning-200": string,
      "mail-header-500": string,
      "facebook-800": string,
      "primary-200": string,
      "success-500": string,
      "primary-500": string,
      "text-primary": string,
      "accent-600": string,
      "brand-info": string,
      "danger-700": string,
      "warning-900": string,
      "trip-end": string,
      "accent-700": string,
      "neutral-800": string,
      "danger-600": string,
      "success-800": string,
      "danger-100": string,
      "success-600": string,
      "accent-400": string,
      "primary-700": string,
    |},
  |},
  company_name: string,
  localization: {|
    languages: {|
      default: string,
      locales: {
        [lang: string]: {|
          enabled: boolean,
          mailing: boolean,
        |},
      },
    |},
  |},
  auth: {|
    credentials: boolean,
    social_google: {|
      enabled: boolean,
    |},
    social_facebook: {|
      enabled: boolean,
    |},
  |},
  web_title: string,
  affilid: string,
  services: {|
    add_bags: {|
      enabled: boolean,
    |},
    refunds: {|
      enabled: boolean,
    |},
    change_flights: {|
      enabled: boolean,
    |},
    watchdog: {|
      enabled: boolean,
    |},
    insurance: {|
      enabled: boolean,
    |},
    guarantee: {|
      enabled: boolean,
    |},
  |},
  fallbackDomain: string,
  name: string,
  web_link: string,
  payments: {|
    zooz_id: string,
    refund_methods: {|
      origin: {|
        enabled: boolean,
      |},
      credits: {|
        enabled: boolean,
      |},
      pay_pal: {|
        enabled: boolean,
      |},
      voucher: {|
        enabled: boolean,
      |},
      bank_transfer: {|
        enabled: boolean,
      |},
    |},
    whitelisted_currencies: string[],
    payment_methods: {|
      alipay: {|
        enabled: boolean,
      |},
      sofort: {|
        enabled: boolean,
      |},
      cup: {|
        enabled: boolean,
      |},
      paypal: {|
        enabled: boolean,
      |},
      credits: {|
        enabled: boolean,
      |},
      yandex: {|
        enabled: boolean,
      |},
      trustly: {|
        enabled: boolean,
      |},
      card: {|
        enabled: boolean,
      |},
    |},
  |},
  powered_by_kiwi: boolean,
|};

export type Brands = { [key: string]: Brand };

// eslint-disable-next-line import/prefer-default-export
export const brandDefault: Brand = {
  domain: "kiwi.com",
  home_redirect_url: "/",
  communication: {
    push_notifications_sending: {
      filter_out: [],
      enabled: true,
    },
    newsletter: {
      enabled: true,
    },
    email_sending: {
      support_sender_address: "support@kiwi.com",
      info_sender_address: "info@kiwi.com",
      human_resources_address: "jobs@kiwi.com",
      at_the_airport_address: "at.the.airport@kiwi.com",
      guarantee_address: "guarantee@kiwi.com",
      sender_name: "Kiwi.com",
      filter_out: [],
      main_sender_address: "tickets@kiwi.com",
      enabled: true,
      help_request_address: "help-request@kiwi.com",
      business_address: "b2b@kiwi.com",
      refund_reply_address: "refund@kiwi.com",
      archive_email_proxy_list: [
        "archiveproxy1@kiwi.com",
        "archiveproxy2@kiwi.com",
        "archiveproxy3@kiwi.com",
        "archiveproxy4@kiwi.com",
        "archiveproxy5@kiwi.com",
        "archiveproxy6@kiwi.com",
        "archiveproxy7@kiwi.com",
        "archiveproxy8@kiwi.com",
      ],
      marketing_address: "marketing@kiwi.com",
      signing_domain: "kiwi.com",
      legal_address: "legal@kiwi.com",
    },
    sms_sending: {
      twilio_number: "+12027596303",
      sender_name: "KiwiCom",
      filter_out: [],
      enabled: true,
      nexmo_number: "12242258702",
      company_name: "Kiwi.com",
    },
  },
  api: {
    helpcenter: "https://api.skypicker.com/knowledgebase/api/v1",
  },
  booked_at: "skypicker",
  partner: "skypicker",
  id: "kiwicom",
  support_247: true,
  contacts: {
    phones: {
      enabled: true,
      locales: {
        el: {
          number: "44 2038085910",
          id: "el",
          native_support: "Support Available in English 24/7",
        },
        ch: {
          number: "41 435080835",
          id: "ch",
          native_support:
            "Support Available in German Mon-Fr 9am-5PM CET; French Mon-Fr 9am-5PM CET; Italian Mon-Fr 9am-5PM CET; English 24/7",
        },
        ae: {
          number: "44 2038085910",
          id: "ae",
          native_support: "Support Available in English 24/7",
        },
        cn: {
          number: "44 2038085910",
          id: "cn",
          native_support: "Support Available in English 24/7",
        },
        ag: {
          number: "54 1159843603",
          id: "ag",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        cl: {
          number: "56 442050453",
          id: "cl",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        ee: {
          number: "44 2038085910",
          id: "ee",
          native_support: "Support Available in English 24/7",
        },
        ca: {
          number: "1 6136994479",
          id: "ca",
          native_support: "Support Available in English 24/7",
        },
        sk: {
          number: "420 228885100",
          id: "sk",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        it: {
          number: "39 0694806508",
          id: "it",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        ec: {
          number: "34 911985069",
          id: "ec",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        cz: {
          number: "420 228885100",
          id: "cz",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        ar: {
          number: "44 2038085910",
          id: "ar",
          native_support: "Support Available in English 24/7",
        },
        au: {
          number: "61 261450125",
          id: "au",
          native_support: "Support Available in English 24/7",
        },
        at: {
          number: "43 720880395",
          id: "at",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        in: {
          number: "44 2038085910",
          id: "in",
          native_support: "Support Available in English 24/7",
        },
        co: {
          number: "57 15085987",
          id: "co",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        ie: {
          number: "353 768889611",
          id: "ie",
          native_support: "Support Available in English 24/7",
        },
        id: {
          number: "65 31638950",
          id: "id",
          native_support: "Support Available in English 24/7",
        },
        es: {
          number: "34 911985069",
          id: "es",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        ct: {
          number: "34 911985069",
          id: "ct",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        my: {
          number: "60 392126870",
          id: "my",
          native_support: "Support Available in English 24/7",
        },
        ru: {
          number: "7 (499)3482751",
          id: "ru",
          native_support: "Mon - Fri 8am-4pm CEST; English 24/7",
        },
        nl: {
          number: "31 208087315",
          id: "nl",
          native_support: "Support Available in English 24/7",
        },
        pt: {
          number: "351 308808567",
          id: "pt",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        no: {
          number: "47 81503187",
          id: "no",
          native_support: "Support Available in English 24/7",
        },
        tw: {
          number: "44 2038085910",
          id: "tw",
          native_support: "Support Available in English 24/7",
        },
        tr: {
          number: "44 2038085910",
          id: "tr",
          native_support: "Support Available in English 24/7",
        },
        lt: {
          number: "44 2038085910",
          id: "lt",
          native_support: "Support Available in English 24/7",
        },
        by: {
          number: "7 (499)3482751",
          id: "by",
          native_support: "Mon - Fri 8am-4pm CEST; English 24/7",
        },
        nz: {
          number: "64 48318691",
          id: "nz",
          native_support: "Support Available in English 24/7",
        },
        en: {
          number: "44 2038085910",
          id: "en",
          native_support: "Support Available in English 24/7",
        },
        th: {
          number: "66 20184125",
          id: "th",
          native_support: "Support Available in English 24/7",
        },
        pe: {
          number: "51 17050272",
          id: "pe",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        ph: {
          number: "63 26263202",
          id: "ph",
          native_support: "Support Available in English 24/7",
        },
        ro: {
          number: "44 2038085910",
          id: "ro",
          native_support: "Support Available in English 24/7",
        },
        gb: {
          number: "44 2038085910",
          id: "gb",
          native_support: "Support Available in English 24/7",
        },
        is: {
          number: "44 2038085910",
          id: "is",
          native_support: "Support Available in English 24/7",
        },
        pl: {
          number: "48 223077259",
          id: "pl",
          native_support: "Support Available in English 24/7",
        },
        be: {
          number: "33 182885114",
          id: "be",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        fr: {
          number: "33 (0) 182885114",
          id: "fr",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        bg: {
          number: "44 2038085910",
          id: "bg",
          native_support: "Support Available in English 24/7",
        },
        dk: {
          number: "45 89882821",
          id: "dk",
          native_support: "Support Available in English 24/7",
        },
        hr: {
          number: "44 2038085910",
          id: "hr",
          native_support: "Support Available in English 24/7",
        },
        bh: {
          number: "44 2038085910",
          id: "bh",
          native_support: "Support Available in English 24/7",
        },
        de: {
          number: "49 302 1782595",
          id: "de",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        jp: {
          number: "81 34 580 7554",
          id: "jp",
          native_support: "Mon - Fri 2am-10am CEST; English 24/7",
        },
        da: {
          number: "45 89882821",
          id: "da",
          native_support: "Support Available in English 24/7",
        },
        za: {
          number: "44 2038085910",
          id: "za",
          native_support: "Support Available in English 24/7",
        },
        hk: {
          number: "44 2038085910",
          id: "hk",
          native_support: "Support Available in English 24/7",
        },
        jo: {
          number: "44 2038085910",
          id: "jo",
          native_support: "Support Available in English 24/7",
        },
        vn: {
          number: "842 444583392",
          id: "vn",
          native_support: "Support Available in English 24/7",
        },
        br: {
          number: "55 6135500836",
          id: "br",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        fi: {
          number: "35 8841541695",
          id: "fi",
          native_support: "Support Available in English 24/7",
        },
        hu: {
          number: "44 2038085910",
          id: "hu",
          native_support: "Support Available in English 24/7",
        },
        ja: {
          number: "81 34 580 7554",
          id: "ja",
          native_support: "Mon - Fri 2am-10am CEST; English 24/7",
        },
        om: {
          number: "44 2038085910",
          id: "om",
          native_support: "Support Available in English 24/7",
        },
        default: {
          number: "44 2038085910",
          id: "gb",
          native_support: "Support Available in English 24/7",
        },
        sg: {
          number: "65 31638950",
          id: "sg",
          native_support: "Support Available in English 24/7",
        },
        ko: {
          number: "82 7047844329",
          id: "ko",
          native_support: "Mon - Fri 2am-10am CEST; English 24/7",
        },
        sv: {
          number: "46 844680713",
          id: "sv",
          native_support: "Support Available in English 24/7",
        },
        us: {
          number: "1 2028444159",
          id: "us",
          native_support: "Support Available in English 24/7",
        },
        qa: {
          number: "44 2038085910",
          id: "qa",
          native_support: "Support Available in English 24/7",
        },
        kr: {
          number: "82 7047844329",
          id: "kr",
          native_support: "Mon - Fri 2am-10am CEST; English 24/7",
        },
        kw: {
          number: "44 2038085910",
          id: "kw",
          native_support: "Support Available in English 24/7",
        },
        "ca-fr": {
          number: "1 6136864412",
          id: "ca-fr",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        uk: {
          number: "44 2038085910",
          id: "uk",
          native_support: "Support Available in English 24/7",
        },
        sr: {
          number: "44 2038085910",
          id: "sr",
          native_support: "Support Available in English 24/7",
        },
        kz: {
          number: "7 (499)3482751",
          id: "kz",
          native_support: "Mon - Fri 8am-4pm CEST; English 24/7",
        },
        ua: {
          number: "380 947113191",
          id: "ua",
          native_support: "Mon - Fri 8am-4pm CEST; English 24/7",
        },
        mx: {
          number: "52 5541647694",
          id: "mx",
          native_support: "Mon - Fri 9am-5pm CEST; English 24/7",
        },
        se: {
          number: "46 840839673",
          id: "se",
          native_support: "Support Available in English 24/7",
        },
        il: {
          number: "44 2038085910",
          id: "il",
          native_support: "Support Available in English 24/7",
        },
      },
    },
    emails: {
      enabled: true,
      locales: {
        el: {
          webFormAlias: "grwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "el",
          email: "support.en@kiwi.com",
        },
        ch: {
          webFormAlias: "chwebform@kiwi.com",
          webFormEmail: "support.deu@kiwi.mypurecloud.ie",
          id: "ch",
          email: "support.deu@kiwi.com",
        },
        ae: {
          webFormAlias: "aewebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "ae",
          email: "support.ar@kiwi.com",
        },
        cn: {
          webFormAlias: "cnwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "cn",
          email: "support.en@kiwi.com",
        },
        ag: {
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          email: "support.esp@kiwi.com",
        },
        cl: {
          webFormAlias: "clwebform@kiwi.com",
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          id: "cl",
          email: "support.esp@kiwi.com",
        },
        ee: {
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          email: "support.en@kiwi.com",
        },
        ca: {
          webFormAlias: "cawebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "ca",
          email: "support.en@kiwi.com",
        },
        sk: {
          webFormAlias: "skwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "sk",
          email: "support.en@kiwi.com",
        },
        it: {
          webFormAlias: "itwebform@kiwi.com",
          webFormEmail: "support.it@kiwi.mypurecloud.ie",
          id: "it",
          email: "support.it@kiwi.com",
        },
        ec: {
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          email: "support.esp@kiwi.com",
        },
        cz: {
          webFormAlias: "czwebform@kiwi.com",
          webFormEmail: "support.cz@kiwi.mypurecloud.ie",
          id: "cz",
          email: "support.cz@kiwi.com",
        },
        ar: {
          webFormAlias: "sawebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "ar",
          email: "support.ar@kiwi.com",
        },
        au: {
          webFormAlias: "auwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "au",
          email: "support.en@kiwi.com",
        },
        at: {
          webFormAlias: "atwebform@kiwi.com",
          webFormEmail: "support.deu@kiwi.mypurecloud.ie",
          id: "at",
          email: "support.deu@kiwi.com",
        },
        in: {
          webFormAlias: "inwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "in",
          email: "support.en@kiwi.com",
        },
        co: {
          webFormAlias: "cowebform@kiwi.com",
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          id: "co",
          email: "support.esp@kiwi.com",
        },
        ie: {
          webFormAlias: "iewebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "ie",
          email: "support.en@kiwi.com",
        },
        id: {
          webFormAlias: "idwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "id",
          email: "support.en@kiwi.com",
        },
        es: {
          webFormAlias: "eswebform@kiwi.com",
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          id: "es",
          email: "support.esp@kiwi.com",
        },
        ct: {
          webFormAlias: "eswebform@kiwi.com",
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          id: "ct",
          email: "support.esp@kiwi.com",
        },
        my: {
          webFormAlias: "mywebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "my",
          email: "support.en@kiwi.com",
        },
        ru: {
          webFormAlias: "ruwebform@kiwi.com",
          webFormEmail: "support.ru@kiwi.mypurecloud.ie",
          id: "ru",
          email: "support.ru@kiwi.com",
        },
        nl: {
          webFormAlias: "nlwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "nl",
          email: "support.en@kiwi.com",
        },
        pt: {
          webFormAlias: "ptwebform@kiwi.com",
          webFormEmail: "support.por@kiwi.mypurecloud.ie",
          id: "pt",
          email: "support.por@kiwi.com",
        },
        no: {
          webFormAlias: "nowebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "no",
          email: "support.en@kiwi.com",
        },
        tw: {
          webFormAlias: "twwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "tw",
          email: "support.en@kiwi.com",
        },
        tr: {
          webFormAlias: "trwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "tr",
          email: "support.en@kiwi.com",
        },
        lt: {
          webFormAlias: "ltwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "lt",
          email: "support.en@kiwi.com",
        },
        by: {
          webFormEmail: "support.ru@kiwi.mypurecloud.ie",
          email: "support.ru@kiwi.com",
        },
        nz: {
          webFormAlias: "nzwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "nz",
          email: "support.en@kiwi.com",
        },
        en: {
          webFormAlias: "ukwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "en",
          email: "support.en@kiwi.com",
        },
        th: {
          webFormAlias: "thwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "th",
          email: "support.en@kiwi.com",
        },
        pe: {
          webFormAlias: "pewebform@kiwi.com",
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          id: "pe",
          email: "support.esp@kiwi.com",
        },
        ph: {
          webFormAlias: "phwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "ph",
          email: "support.en@kiwi.com",
        },
        ro: {
          webFormAlias: "rowebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "ro",
          email: "support.en@kiwi.com",
        },
        is: {
          webFormAlias: "iswebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "is",
          email: "support.en@kiwi.com",
        },
        pl: {
          webFormAlias: "plwebform@kiwi.com",
          webFormEmail: "support.pl@kiwi.mypurecloud.ie",
          id: "pl",
          email: "support.pl@kiwi.com",
        },
        be: {
          webFormAlias: "bewebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "be",
          email: "support.en@kiwi.com",
        },
        fr: {
          webFormAlias: "frwebform@kiwi.com",
          webFormEmail: "support.fra@kiwi.mypurecloud.ie",
          id: "fr",
          email: "support.fra@kiwi.com",
        },
        bg: {
          webFormAlias: "bgwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "bg",
          email: "support.en@kiwi.com",
        },
        hr: {
          webFormAlias: "hrwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "hr",
          email: "support.en@kiwi.com",
        },
        de: {
          webFormAlias: "dewebform@kiwi.com",
          webFormEmail: "support.deu@kiwi.mypurecloud.ie",
          id: "de",
          email: "support.deu@kiwi.com",
        },
        bh: {
          webFormAlias: "bhwebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "bh",
          email: "support.ar@kiwi.com",
        },
        da: {
          webFormAlias: "dkwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "da",
          email: "support.en@kiwi.com",
        },
        za: {
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          email: "support.en@kiwi.com",
        },
        hk: {
          webFormAlias: "hkwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "hk",
          email: "support.en@kiwi.com",
        },
        jo: {
          webFormAlias: "jowebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "jo",
          email: "support.ar@kiwi.com",
        },
        vn: {
          webFormAlias: "vnwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "vn",
          email: "support.en@kiwi.com",
        },
        br: {
          webFormAlias: "brwebform@kiwi.com",
          webFormEmail: "support.por@kiwi.mypurecloud.ie",
          id: "br",
          email: "support.por@kiwi.com",
        },
        fi: {
          webFormAlias: "fiwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "fi",
          email: "support.en@kiwi.com",
        },
        hu: {
          webFormAlias: "huwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "hu",
          email: "support.en@kiwi.com",
        },
        ja: {
          webFormAlias: "jpwebform@kiwi.com",
          webFormEmail: "support.jp@kiwi.mypurecloud.ie",
          id: "ja",
          email: "support.jp@kiwi.com",
        },
        om: {
          webFormAlias: "omwebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "om",
          email: "support.ar@kiwi.com",
        },
        default: {
          webFormAlias: "uswebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "us",
          email: "support.en@kiwi.com",
        },
        sr: {
          webFormAlias: "rswebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "sr",
          email: "support.en@kiwi.com",
        },
        ko: {
          webFormAlias: "krwebform@kiwi.com",
          webFormEmail: "support.kr@kiwi.mypurecloud.ie",
          id: "ko",
          email: "support.kr@kiwi.com",
        },
        sv: {
          webFormAlias: "sewebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "sv",
          email: "support.en@kiwi.com",
        },
        us: {
          webFormAlias: "uswebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "us",
          email: "support.en@kiwi.com",
        },
        qa: {
          webFormAlias: "qawebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "qa",
          email: "support.ar@kiwi.com",
        },
        kw: {
          webFormAlias: "kwwebform@kiwi.com",
          webFormEmail: "support.ar@kiwi.mypurecloud.ie",
          id: "kw",
          email: "support.ar@kiwi.com",
        },
        "ca-fr": {
          webFormAlias: "cafrwebform@kiwi.com",
          webFormEmail: "support.fra@kiwi.mypurecloud.ie",
          id: "ca-fr",
          email: "support.fra@kiwi.com",
        },
        uk: {
          webFormAlias: "uawebform@kiwi.com",
          webFormEmail: "support.ua@kiwi.mypurecloud.ie",
          id: "uk",
          email: "support.ua@kiwi.com",
        },
        kz: {
          webFormEmail: "support.ru@kiwi.mypurecloud.ie",
          email: "support.ru@kiwi.com",
        },
        sg: {
          webFormAlias: "sgwebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "sg",
          email: "support.en@kiwi.com",
        },
        mx: {
          webFormAlias: "mxwebform@kiwi.com",
          webFormEmail: "support.esp@kiwi.mypurecloud.ie",
          id: "mx",
          email: "support.esp@kiwi.com",
        },
        il: {
          webFormAlias: "uswebform@kiwi.com",
          webFormEmail: "support.en@kiwi.mypurecloud.ie",
          id: "il",
          email: "support.en@kiwi.com",
        },
      },
    },
    chat: {
      enabled: false,
    },
  },
  base_url: "https://www.kiwi.com",
  content: {
    eticket: {
      credit_cards: {
        primary_string: "CEO, Oliver Dlouhý",
        show_signature: true,
        secondary_string: "Kiwi.com",
      },
    },
    media: {
      instagram: {
        link: "https://instagram.com/kiwicom247",
        enabled: true,
      },
      twitter: {
        link: "https://twitter.com/kiwicom247",
        enabled: true,
      },
      youtube: {
        enabled: false,
      },
      linkedin: {
        link: "https://www.linkedin.com/company/Kiwi.com",
        enabled: true,
      },
      blog: {
        enabled: false,
      },
      facebook: {
        link: "https://www.facebook.com/kiwicom247",
        enabled: true,
      },
    },
    search: {
      sorting: {
        enabled: true,
      },
    },
    legal: {
      booking_agreement: {
        t_key: "text_new2",
      },
      cookies: {
        t_key: "kiwicom",
      },
      terms: {
        t_key: "terms_kiwicom",
      },
      privacy: {
        t_key: "kiwicom",
      },
    },
    general: {
      trustpilot: {
        link: "https://www.trustpilot.com/review/Kiwi.com",
        enabled: true,
      },
    },
    promotion: {
      uber: {
        link: "https://Uber.com/app",
        code: "KIWICOM2017",
        enabled: true,
      },
      mobile_apps: {
        download: {
          link: "https://kiwi.com/app",
          enabled: true,
        },
        android: {
          link: "https://play.google.com/store/apps/details?id=__ID__",
          enabled: true,
          id: "com.skypicker.main",
        },
        ios: {
          link: "https://itunes.apple.com/app/id__ID__",
          enabled: true,
          id: "657843853",
        },
      },
      car_rental: {
        mail_link_base_url: "https://rentalcars.com/SearchLoaderRC.do?",
        mail_link:
          "http://www.rentalcars.com/Home.do?affiliateCode=skypicker&preflang=en&adcamp=link&adplat=confemail",
        enabled: true,
        external: false,
        email_enabled: true,
      },
      accommodation: {
        mail_link_base_url: "http://hotels.kiwi.com/searchresults.html?",
        enabled: true,
        external: false,
        email_enabled: true,
      },
    },
    pages: {
      about: {
        fully_qualified: false,
        link: "/pages/content/about",
        enabled: true,
      },
      terms: {
        fully_qualified: false,
        link: "/pages/content/legal",
        enabled: true,
      },
      invite: {
        link: "/pages/invite",
        enabled: true,
      },
      privacy: {
        fully_qualified: false,
        link: "/content/privacy",
        enabled: true,
      },
      top_routes: {
        fully_qualified: false,
        link: "/cheap-flights",
        enabled: true,
      },
      media: {
        fully_qualified: false,
        link: "/pages/content/media",
        enabled: true,
      },
      brand: {
        fully_qualified: true,
        link: "https://brand.kiwi.com/",
        enabled: false,
      },
      faq: {
        fully_qualified: false,
        link: "/helpcenter",
        enabled: true,
      },
      stories: {
        link: "https://www.kiwi.com/stories/?utm_source=kiwicom&utm_medium=website",
        enabled: true,
      },
      branding: {
        link: "http://brand.kiwi.com/",
        enabled: false,
      },
      security: {
        link: "/pages/security",
        enabled: true,
      },
      careers: {
        fully_qualified: true,
        link: "https://www.kiwi.com/jobs",
        enabled: true,
      },
      guarantee: {
        fully_qualified: false,
        link: "/pages/guarantee",
        enabled: true,
      },
    },
  },
  theme: {
    colors: {
      "danger-900": "#9e1616",
      "primary-800": "#009b88",
      "danger-300": " #ff7e7e",
      "google-800": "#e84735",
      "accent-500": "#ffcc00",
      "grey-500": "#94a2b0",
      "danger-800": " #b91919",
      "accent-200": "#F8CA32",
      "success-300": "#8fec70",
      "primary-900": "#008676",
      "danger-400": " #ff5858",
      "accent-100": "#F8CA32",
      "grey-400": "#adb9c5",
      "neutral-200": "#d5dee7", // paletteCloudNormalHover
      "neutral-500": "#94a2b0",
      "primary-300": "#4de3d0",
      "success-200": "#b2f79c",
      "warning-400": "#ffce67",
      "grey-200": "#d5dee7",
      "neutral-400": "#adb9c5", // paletteInkLighter
      "warning-500": "#ffc345",
      "trip-start": "#0097a9",
      "google-500": "#ff5542",
      "neutral-700": "#57626c", // paletteInkNormal
      "accent-800": "#F8CA32",
      "neutral-300": "#c6d0dc",
      "accent-900": "#F8CA32",
      "neutral-600": "#7c8b99",
      "danger-500": "#ff2424",
      "accent-300": "#F8CA32",
      "danger-200": " #ffa8a8",
      "insurance-plus": "#F5922A",
      "grey-700": "#57626c", // paletteInkNormal
      white: "#ffffff",
      "grey-900": "#171b1e", // paletteInkDark
      "grey-600": "#7c8b99",
      "neutral-900": "#171b1e",
      "facebook-500": "#4465ad",
      "grey-100": "#edeff2",
      "warning-300": "#ffdb8d",
      "success-400": "#6ee445",
      "warning-600": "#f0b539",
      "warning-800": "#c9972e",
      "facebook-600": "#3b5998",
      "primary-600": "#01bba5", // paletteProductNormal
      "grey-800": "#2e353b", // paletteInkNormalActive
      "success-700": "#2eb300",
      "warning-700": "#dda734",
      "primary-100": "#b2f3eb",
      "neutral-100": "#e9eef2", // paletteCloudNormal
      "text-secondary": "#2f2f2f", // paletteInkDark
      "mail-footer-500": "#0097A9",
      "success-100": "#d3fac5",
      "warning-100": "#fff1cf",
      "mail-button-500": "#0097A9",
      "google-600": "#f34a38",
      "primary-400": "#00d7bd",
      "success-900": "#248e00",
      "warning-200": "#ffe7b2",
      "mail-header-500": "#0097A9",
      "facebook-800": "#344d85",
      "primary-200": "#77ebdd",
      "success-500": "#52cf26",
      "primary-500": "#00ccb4",
      "text-primary": "#ffffff",
      "accent-600": "#F8CA32",
      "brand-info": "",
      "danger-700": "#d21c1c", // colorTextError, paletteRedNormal
      "warning-900": "#ac8127",
      "trip-end": "#d50c6a",
      "accent-700": "#F8CA32",
      "neutral-800": "#2e353b", // paletteInkNormalActive
      "danger-600": " #e51f1f",
      "success-800": "#29a000",
      "danger-100": " #ffc7c7",
      "success-600": "#37c207",
      "accent-400": "#F8CA32",
      "primary-700": "#00ad98",
    },
  },
  company_name: "Kiwi.com",
  localization: {
    languages: {
      default: "en",
      locales: {
        el: {
          enabled: true,
          mailing: false,
        },
        ch: {
          enabled: true,
          mailing: false,
        },
        ae: {
          enabled: true,
          mailing: false,
        },
        cn: {
          enabled: true,
          mailing: false,
        },
        ag: {
          enabled: true,
          mailing: false,
        },
        cl: {
          enabled: true,
          mailing: false,
        },
        ee: {
          enabled: true,
          mailing: false,
        },
        ca: {
          enabled: true,
          mailing: false,
        },
        sk: {
          enabled: true,
          mailing: true,
        },
        it: {
          enabled: true,
          mailing: true,
        },
        ec: {
          enabled: true,
          mailing: false,
        },
        cz: {
          enabled: true,
          mailing: false,
        },
        ar: {
          enabled: true,
          mailing: false,
        },
        au: {
          enabled: true,
          mailing: false,
        },
        at: {
          enabled: true,
          mailing: false,
        },
        in: {
          enabled: true,
          mailing: false,
        },
        cs: {
          enabled: true,
          mailing: true,
        },
        co: {
          enabled: true,
          mailing: false,
        },
        ie: {
          enabled: true,
          mailing: false,
        },
        id: {
          enabled: true,
          mailing: false,
        },
        es: {
          enabled: true,
          mailing: true,
        },
        ct: {
          enabled: true,
          mailing: false,
        },
        my: {
          enabled: true,
          mailing: false,
        },
        ru: {
          enabled: true,
          mailing: true,
        },
        nl: {
          enabled: true,
          mailing: true,
        },
        pt: {
          enabled: true,
          mailing: true,
        },
        no: {
          enabled: true,
          mailing: false,
        },
        tw: {
          enabled: true,
          mailing: false,
        },
        tr: {
          enabled: true,
          mailing: true,
        },
        lt: {
          enabled: true,
          mailing: false,
        },
        by: {
          enabled: true,
          mailing: false,
        },
        nz: {
          enabled: true,
          mailing: false,
        },
        en: {
          enabled: true,
          mailing: true,
        },
        th: {
          enabled: true,
          mailing: false,
        },
        pe: {
          enabled: true,
          mailing: false,
        },
        ph: {
          enabled: true,
          mailing: false,
        },
        ro: {
          enabled: true,
          mailing: true,
        },
        is: {
          enabled: true,
          mailing: false,
        },
        pl: {
          enabled: true,
          mailing: true,
        },
        be: {
          enabled: true,
          mailing: false,
        },
        fr: {
          enabled: true,
          mailing: true,
        },
        bg: {
          enabled: true,
          mailing: true,
        },
        hr: {
          enabled: true,
          mailing: false,
        },
        de: {
          enabled: true,
          mailing: true,
        },
        bh: {
          enabled: true,
          mailing: false,
        },
        da: {
          enabled: true,
          mailing: true,
        },
        za: {
          enabled: true,
          mailing: false,
        },
        hk: {
          enabled: true,
          mailing: false,
        },
        jo: {
          enabled: true,
          mailing: false,
        },
        vn: {
          enabled: true,
          mailing: false,
        },
        br: {
          enabled: true,
          mailing: false,
        },
        fi: {
          enabled: true,
          mailing: true,
        },
        hu: {
          enabled: true,
          mailing: true,
        },
        ja: {
          enabled: true,
          mailing: true,
        },
        om: {
          enabled: true,
          mailing: false,
        },
        sr: {
          enabled: true,
          mailing: true,
        },
        ko: {
          enabled: true,
          mailing: true,
        },
        sv: {
          enabled: true,
          mailing: true,
        },
        us: {
          enabled: true,
          mailing: false,
        },
        qa: {
          enabled: true,
          mailing: false,
        },
        kw: {
          enabled: true,
          mailing: false,
        },
        "ca-fr": {
          enabled: true,
          mailing: false,
        },
        uk: {
          enabled: true,
          mailing: true,
        },
        kz: {
          enabled: true,
          mailing: false,
        },
        sg: {
          enabled: true,
          mailing: false,
        },
        mx: {
          enabled: true,
          mailing: false,
        },
        il: {
          enabled: true,
          mailing: false,
        },
      },
    },
  },
  auth: {
    credentials: true,
    social_google: {
      enabled: true,
    },
    social_facebook: {
      enabled: true,
    },
  },
  web_title: "www.kiwi.com",
  affilid: "skypicker",
  services: {
    add_bags: {
      enabled: true,
    },
    refunds: {
      enabled: true,
    },
    change_flights: {
      enabled: true,
    },
    watchdog: {
      enabled: true,
    },
    insurance: {
      enabled: true,
    },
    guarantee: {
      enabled: true,
    },
  },
  fallbackDomain: "",
  name: "Kiwi.com",
  web_link: "https://www.kiwi.com",
  payments: {
    zooz_id: "skypicker_new",
    refund_methods: {
      origin: {
        enabled: true,
      },
      credits: {
        enabled: true,
      },
      pay_pal: {
        enabled: true,
      },
      voucher: {
        enabled: true,
      },
      bank_transfer: {
        enabled: true,
      },
    },
    whitelisted_currencies: [
      "aed",
      "amd",
      "ars",
      "aud",
      "bhd",
      "brl",
      "byn",
      "cad",
      "chf",
      "clp",
      "cny",
      "cop",
      "czk",
      "dkk",
      "eur",
      "gbp",
      "hkd",
      "huf",
      "idr",
      "ils",
      "inr",
      "isk",
      "jod",
      "jpy",
      "kgs",
      "krw",
      "kwd",
      "kzt",
      "mxn",
      "myr",
      "nok",
      "nzd",
      "omr",
      "pen",
      "php",
      "pln",
      "qar",
      "ron",
      "rsd",
      "rub",
      "sar",
      "sek",
      "sgd",
      "thb",
      "try",
      "twd",
      "uah",
      "usd",
      "uzs",
      "yer",
      "zar",
    ],
    payment_methods: {
      alipay: {
        enabled: true,
      },
      sofort: {
        enabled: true,
      },
      cup: {
        enabled: true,
      },
      paypal: {
        enabled: true,
      },
      credits: {
        enabled: true,
      },
      yandex: {
        enabled: true,
      },
      trustly: {
        enabled: true,
      },
      card: {
        enabled: true,
      },
    },
  },
  powered_by_kiwi: false,
};
