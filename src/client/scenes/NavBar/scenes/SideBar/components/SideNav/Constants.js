// @flow strict
import * as R from "ramda";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Deals from "@kiwicom/orbit-components/lib/icons/Deals";
import ContactEmail from "@kiwicom/orbit-components/lib/icons/ContactEmail";
import StarFull from "@kiwicom/orbit-components/lib/icons/StarFull";
import Globe from "@kiwicom/orbit-components/lib/icons/Globe";
import City from "@kiwicom/orbit-components/lib/icons/City";
import Kiwicom from "@kiwicom/orbit-components/lib/icons/Kiwicom";
import KiwicomCare from "@kiwicom/orbit-components/lib/icons/KiwicomCare";
import KiwicomGuarantee from "@kiwicom/orbit-components/lib/icons/KiwicomGuarantee";
import Code from "@kiwicom/orbit-components/lib/icons/Code";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import TermsAndConditions from "@kiwicom/orbit-components/lib/icons/TermsAndConditions";
import Settings from "@kiwicom/orbit-components/lib/icons/Settings";
import Security from "@kiwicom/orbit-components/lib/icons/Security";
import Facebook from "@kiwicom/orbit-components/lib/icons/Facebook";
import Instagram from "@kiwicom/orbit-components/lib/icons/Instagram";
import Twitter from "@kiwicom/orbit-components/lib/icons/Twitter";
import Linkedin from "@kiwicom/orbit-components/lib/icons/Linkedin";
import Chat from "@kiwicom/orbit-components/lib/icons/Chat";

import { DEV, STAGING } from "client/consts/env";
import type { Brand } from "client/records/Brand";

const Icons = {
  AccountCircle,
  Deals,
  ContactEmail,
  Facebook,
  Instagram,
  StarFull,
  Kiwicom,
  KiwicomCare,
  KiwicomGuarantee,
  Code,
  Suitcase,
  TermsAndConditions,
  Security,
  City,
  Twitter,
  Linkedin,
  Globe,
  Settings,
  Chat,
};

const CONTENT_SITE_TITLES = {
  faq: __("content.pages.faq.title"),
  team: __("content.pages.team.title"),
  refund: __("content.pages.refund.title"),
  privacy: __("content.pages.privacy.title"),
  media: __("content.pages_v2.media.press_kit"),
  legal: __("content.pages.legal.title"),
  investors: __("content.pages.investors.title"),
  about: __("content.pages.about.title"),
  account: __("content.pages.account.title"),
  business: __("content.pages.business.title"),
  cookies: __("content.pages.cookies.title"),
  cookies_settings: __("content.pages.cookies_settings.title"),
  feedback: __("content.pages.feedback.get_support"),
  guarantee: __("content.pages.guarantee.title"),
  careers: __("content.pages.careers.title"),
  manage: __("content.pages.manage.title"),
  support: __("content.pages.support.title"),
  stories: __("content.stories"),
  security: __("content.pages.security_title"),
  branding: __("content.branding"),
  invite: __("pages.buddy.landing.title"),
  gdpr_terms: __("content.pages.terms.title"),
};

export function getPageTitle(name: string) {
  return CONTENT_SITE_TITLES[name];
}

export function getIcon(icon: string) {
  return Icons[icon];
}

export const IS_DEBUG_ENABLED = DEV || STAGING;

const navCompanyItemsProps = {
  branding: {
    title: getPageTitle("branding"),
    iconClass: "Kiwicom",
    dataTest: "SideNav-branding",
  },
  stories: {
    title: getPageTitle("stories"),
    iconClass: "Kiwicom",
    dataTest: "SideNav-stories",
  },
  security: {
    title: getPageTitle("security"),
    iconClass: "Security",
    dataTest: "SideNav-security",
  },
  about: {
    title: getPageTitle("about"),
    iconClass: "City",
    dataTest: "SideNav-about",
  },
  terms: {
    title: getPageTitle("legal"),
    iconClass: "TermsAndConditions",
    dataTest: "SideNav-terms",
  },
  gdpr_terms: {
    title: getPageTitle("gdpr_terms"),
    iconClass: "TermsAndConditions",
    dataTest: "SideNav-gdpr-terms",
  },
  guarantee: {
    title: getPageTitle("guarantee"),
    iconClass: "KiwicomGuarantee",
    dataTest: "SideNav-guarantee",
  },
  privacy: {
    title: getPageTitle("privacy"),
    iconClass: "Security",
    dataTest: "SideNav-privacy",
  },
  careers: {
    title: getPageTitle("careers"),
    iconClass: "Suitcase",
  },
  media: {
    title: getPageTitle("media"),
    iconClass: "Kiwicom",
    dataTest: "SideNav-press_kit",
  },
  invite: {
    title: getPageTitle("invite"),
    iconClass: "Kiwicom",
    dataTest: "SideNav-invite",
  },
};

const navCompanyKeys = R.keys(navCompanyItemsProps);

export const companySection = (branding: Brand) => {
  const guarantee = R.set(
    R.lensProp("link"),
    "/pages/guarantee",
    R.path(["services", "guarantee"], branding),
  );
  const companyItems = R.set(
    R.lensProp("guarantee"),
    guarantee,
    R.path(["content", "pages"], branding),
  );

  return R.filter(
    R.prop("enabled"),
    R.mergeDeepLeft(navCompanyItemsProps, R.pick(navCompanyKeys, companyItems)),
  );
};

export function getSocialMedia(brand: Brand) {
  return R.map(R.prop("link"))(R.filter(R.prop("enabled"))(brand.content.media));
}
