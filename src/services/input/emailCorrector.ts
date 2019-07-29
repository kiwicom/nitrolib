import mailcheck from "mailcheck";
import isEmail from "validator/lib/isEmail";

const DOMAINS = [
  "aim.com",
  "bk.ru",
  "centrum.cz",
  "email.cz",
  "gmail.com",
  "google.com",
  "googlemail.com",
  "inbox.ru",
  "libero.it",
  "list.ru",
  "me.com",
  "msn.com",
  "online.no",
  "qq.com",
  "qunar.com",
  "rambler.ru",
  "rocketmail.com",
  "seznam.cz",
  "skypicker.com",
  "t-online.de",
  "ukr.net",
  "web.de",
  "wego.com",
  "yandex.ru",
  "ymail.com",
];

const SLD = ["hotmail", "live", "mail", "outlook", "yahoo"];

const TLD = [
  "ac.uk",
  "at",
  "be",
  "be.ch",
  "biz",
  "ca",
  "ch",
  "co.il",
  "co.jp",
  "co.nz",
  "co.uk",
  "com",
  "com.ar",
  "com.au",
  "com.br",
  "com.hk",
  "com.mx",
  "com.ph",
  "com.sg",
  "com.tw",
  "cz",
  "cn",
  "de",
  "dk",
  "edu",
  "es",
  "eu",
  "fr",
  "gov",
  "gov.uk",
  "gr",
  "hk",
  "hu",
  "ie",
  "in",
  "info",
  "it",
  "jp",
  "kr",
  "me.uk",
  "mil",
  "net",
  "net",
  "net.au",
  "net.uk",
  "nl",
  "no",
  "org",
  "ru",
  "se",
  "sg",
  "uk",
  "us",
  "pl",
];

function emailCorrector(input: string): string {
  if (!input) return ;

  const suggestion = mailcheck.run({
    email: input,
    domains: DOMAINS,
    topLevelDomains: TLD,
    secondLevelDomains: SLD,
  });

  return suggestion && isEmail(suggestion.full) ? suggestion.full : ;
}

export default emailCorrector;
