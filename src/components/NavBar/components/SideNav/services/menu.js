// @flow strict
import * as React from "react";
import * as R from "ramda";
import Facebook from "@kiwicom/orbit-components/lib/icons/Facebook";
import Instagram from "@kiwicom/orbit-components/lib/icons/Instagram";
import Twitter from "@kiwicom/orbit-components/lib/icons/Twitter";
import Linkedin from "@kiwicom/orbit-components/lib/icons/Linkedin";
import Kiwicom from "@kiwicom/orbit-components/lib/icons/Kiwicom";

import type { Brand } from "../../../../../records/Brand";

export const icons = {
  Facebook,
  Instagram,
  Kiwicom,
  Twitter,
  Linkedin,
};

const companyPagesUI = {
  stories: {
    title: __("content.stories"),
  },
  security: {
    title: __("content.pages.security_title"),
  },
  about: {
    title: __("content.pages.about.title"),
  },
  terms: {
    title: __("content.pages.legal.title"),
  },
  gdpr_terms: {
    title: __("content.pages.terms.title"),
  },
  guarantee: {
    title: __("content.pages.guarantee.title"),
  },
  privacy: {
    title: __("content.pages.privacy.title"),
  },
  careers: {
    title: __("content.pages.careers.title"),
  },
  media: {
    title: __("content.pages.media_room"),
  },
  invite: {
    title: __("pages.buddy.landing.title"),
  },
};

type PageItems = {
  [key: string]: {|
    title: string,
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
