// @flow strict
import * as React from "react";
import * as R from "ramda";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Deals from "@kiwicom/orbit-components/lib/icons/Deals";
import ContactEmail from "@kiwicom/orbit-components/lib/icons/ContactEmail";
import StarFull from "@kiwicom/orbit-components/lib/icons/StarFull";
import Trip from "@kiwicom/orbit-components/lib/icons/Trip";
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
import Exchange from "@kiwicom/orbit-components/lib/icons/Exchange";

import type { Brand } from "../../../../../records/Brand";

export const icons = {
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
  Trip,
  Settings,
  Chat,
  Exchange,
};

const companyPagesUI = {
  stories: {
    title: __("content.stories"),
    Icon: icons.Trip,
  },
  security: {
    title: __("content.pages.security_title"),
    Icon: icons.Security,
  },
  about: {
    title: __("content.pages.about.title"),
    Icon: icons.City,
  },
  terms: {
    title: __("content.pages.legal.title"),
    Icon: icons.TermsAndConditions,
  },
  gdpr_terms: {
    title: __("content.pages.terms.title"),
    Icon: icons.TermsAndConditions,
  },
  guarantee: {
    title: __("content.pages.guarantee.title"),
    Icon: icons.KiwicomGuarantee,
  },
  privacy: {
    title: __("content.pages.privacy.title"),
    Icon: icons.Security,
  },
  careers: {
    title: __("content.pages.careers.title"),
    Icon: icons.Suitcase,
  },
  media: {
    title: __("content.pages.media_room"),
    Icon: icons.Kiwicom,
  },
  invite: {
    title: __("pages.buddy.landing.title"),
    Icon: icons.Deals,
  },
};

type PageItems = {
  [key: string]: {|
    title: string,
    Icon: React.ComponentType<{ className: string }>,
    link?: string,
  |},
};

export const getPagesItems = (brand: Brand): PageItems =>
  R.compose(
    R.mapObjIndexed((val, key) => R.merge(val, companyPagesUI[key])),
    R.filter(R.prop("enabled")),
    // $FlowExpected: some props are missing in certain objects
  )(brand.content.pages);

// TODO: missing translations common.instagram etc
const socialPagesUI = {
  instagram: {
    type: "instagram",
    Icon: icons.Instagram,
  },
  twitter: {
    type: "twitter",
    Icon: icons.Twitter,
    label: "common.twitter",
  },
  youtube: {
    type: "youtube",
    Icon: icons.Kiwicom,
  },
  linkedin: {
    type: "linkedin",
    Icon: icons.Linkedin,
  },
  blog: {
    type: "blog",
    Icon: icons.Kiwicom,
  },
  facebook: {
    type: "facebook",
    Icon: icons.Facebook,
    label: "common.facebook",
  },
};

type SocialMedia = {|
  type: string,
  enabled: boolean,
  Icon: React.ComponentType<{ className: string }>,
  link?: string,
  label?: string,
|};

export const getSocialMediaItems = (brand: Brand): SocialMedia[] =>
  R.compose(
    R.values,
    R.mapObjIndexed((val, key) => R.merge(val, socialPagesUI[key])),
    R.filter(R.prop("enabled")),
    // $FlowExpected: some props are missing in certain objects
  )(brand.content.media);
