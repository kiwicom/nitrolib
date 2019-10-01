// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import NavigationList, { NavigationListItem } from "@kiwicom/orbit-components/lib/NavigationList";
import Settings from "@kiwicom/orbit-components/lib/icons/Settings";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Deals from "@kiwicom/orbit-components/lib/icons/Deals";
import ContactEmail from "@kiwicom/orbit-components/lib/icons/ContactEmail";
import Trip from "@kiwicom/orbit-components/lib/icons/Trip";
import Kiwicom from "@kiwicom/orbit-components/lib/icons/Kiwicom";
import KiwicomGuarantee from "@kiwicom/orbit-components/lib/icons/KiwicomGuarantee";
import KiwicomCare from "@kiwicom/orbit-components/lib/icons/KiwicomCare";
import Code from "@kiwicom/orbit-components/lib/icons/Code";
import City from "@kiwicom/orbit-components/lib/icons/City";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import TermsAndConditions from "@kiwicom/orbit-components/lib/icons/TermsAndConditions";
import Security from "@kiwicom/orbit-components/lib/icons/Security";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";

import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import { useBrand } from "../../../../services/brand/context";
import { useAuth } from "../../../../services/auth/context";
import { getPagesItems, getSocialMediaItems } from "./services/menu";
import Currency from "../../../Currency";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import Language from "../../../Language";
import Translate from "../../../Translate";

type Props = {|
  handleOpenDebug: () => void,
  onSaveLanguage: (lang: string) => void,
  handleOpenDebug: () => void,
  handleOpenRegister: () => void,
  handleOpenSignIn: () => void,
  handleOpenSubscription: () => void,
  onToggle: () => void,
  debug?: React.Node,
|};

const Link = styled.a`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  cursor: pointer;

  &:link,
  &:visited {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  }

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

Link.defaultProps = {
  theme: themeDefault,
};

type State = {
  debug: boolean,
  logout: boolean,
  sign_in: boolean,
  languages: boolean,
  currencies: boolean,
  sign_up: boolean,
  subscribe: boolean,
  invite: boolean,
  stories: boolean,
  code: boolean,
  about: boolean,
  careers: boolean,
  care: boolean,
  guarantee: boolean,
  media: boolean,
  terms: boolean,
  gdpr: boolean,
  cookies: boolean,
  privacy: boolean,
  security: boolean,
};

const Content = (props: Props) => {
  const { auth, onSignOut } = useAuth();
  const brand = useBrand();
  const company = getPagesItems(brand);
  const socialMedia = getSocialMediaItems(brand);

  const values = [
    "debug",
    "logout",
    "sign_in",
    "languages",
    "currencies",
    "sign_up",
    "subscribe",
    "invite",
    "stories",
    "code",
    "about",
    "careers",
    "care",
    "guarantee",
    "media",
    "terms",
    "gdpr",
    "cookies",
    "privacy",
    "security",
  ];

  const stateValues: State = R.compose(
    R.mergeAll,
    R.map(item => ({ [item]: false })),
  )(values);

  const [selected, setSelected] = React.useState<State>(stateValues);

  const handleSelect = (item: { [key: string]: boolean }) =>
    setSelected({ ...stateValues, ...item });

  const {
    handleOpenDebug,
    onSaveLanguage,
    handleOpenSignIn,
    handleOpenSubscription,
    handleOpenRegister,
    onToggle,
    debug,
  } = props;

  return (
    <section data-test="NavBar-SideNav">
      {debug && (
        <NavigationList title="Dev features">
          <NavigationListItem
            selected={selected.debug}
            selectable
            icon={<Settings />}
            onClick={() => {
              handleOpenDebug();
              handleSelect({ debug: true });
            }}
          >
            Show debug window
          </NavigationListItem>
        </NavigationList>
      )}
      <Mobile>
        <NavigationList>
          <NavigationListItem
            selected={selected.languages}
            selectable
            onClick={() => handleSelect({ languages: true })}
          >
            <Language onChange={onSaveLanguage} native />
          </NavigationListItem>
          <NavigationListItem
            selected={selected.currencies}
            selectable
            onClick={() => handleSelect({ currencies: true })}
          >
            <Currency native />
          </NavigationListItem>
        </NavigationList>
      </Mobile>
      <NavigationList>
        {auth !== null ? (
          <NavigationListItem
            icon={<AccountCircle />}
            selected={selected.logout}
            selectable
            onClick={() => {
              onSignOut();
              onToggle();
              handleSelect({ logout: true });
            }}
          >
            <Translate t="account.log_out" />
          </NavigationListItem>
        ) : (
          <>
            <NavigationListItem
              selectable
              selected={selected.sign_in}
              icon={<AccountCircle />}
              onClick={() => {
                handleOpenSignIn();
                handleSelect({ sign_in: true });
              }}
            >
              <Translate t="account.sign_in" />
            </NavigationListItem>
            <NavigationListItem
              selectable
              selected={selected.sign_up}
              icon={<AccountCircle />}
              onClick={() => {
                handleOpenRegister();
                handleSelect({ sign_up: true });
              }}
            >
              <Translate t="account.sign_up" />
            </NavigationListItem>
          </>
        )}
      </NavigationList>
      <NavigationList title={<Translate t="sidenav.connect" />}>
        <NavigationListItem
          icon={<Deals />}
          selectable
          onClick={() => handleSelect({ invite: true })}
          selected={selected.invite}
        >
          {company.invite && (
            <BrandedMenuItem title={company.invite.title} link={company.invite.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ subscribe: true })}
          icon={<ContactEmail />}
          selectable
          selected={selected.subscribe}
        >
          {brand.communication.newsletter.enabled && (
            <MenuItem onClick={handleOpenSubscription} text={<Translate t="common.subscribe" />} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ stories: true })}
          selectable
          selected={selected.stories}
          icon={<Trip />}
        >
          {company.stories && (
            <BrandedMenuItem title={company.stories.title} link={company.stories.link} />
          )}
        </NavigationListItem>
      </NavigationList>
      <NavigationList>
        <NavigationListItem>
          <Stack flex align="center" justify="center" spacing="loose">
            {socialMedia.map(({ link, Icon, label }) => (
              <Link
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label && <Translate t={label} />}
              >
                {Icon && <Icon className="socialIcon" />}
              </Link>
            ))}
          </Stack>
        </NavigationListItem>
      </NavigationList>
      <NavigationList title={<Translate t="sidenav.company" />}>
        <NavigationListItem
          onClick={() => handleSelect({ about: true })}
          selectable
          selected={selected.about}
          icon={<City />}
        >
          {company.about && (
            <BrandedMenuItem title={company.about.title} link={company.about.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ careers: true })}
          selectable
          selected={selected.careers}
          icon={<Suitcase />}
        >
          {company.careers && (
            <BrandedMenuItem title={company.careers.title} link={company.careers.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ care: true })}
          selectable
          selected={selected.care}
          icon={<KiwicomCare />}
        >
          {brand.id === "kiwicom" && (
            <MenuItem link="https://care.kiwi.com/" text="Care Kiwi.com" />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ code: true })}
          selectable
          selected={selected.code}
          icon={<Code />}
        >
          {brand.id === "kiwicom" && (
            <MenuItem link="https://code.kiwi.com/" text="Code Kiwi.com" />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ guarantee: true })}
          selectable
          selected={selected.guarantee}
          icon={<KiwicomGuarantee />}
        >
          {company.guarantee && (
            <BrandedMenuItem title={company.guarantee.title} link={company.guarantee.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ media: true })}
          selectable
          selected={selected.media}
          icon={<Kiwicom />}
        >
          {company.media && (
            <BrandedMenuItem title={company.media.title} link="https://media.kiwi.com/" />
          )}
        </NavigationListItem>
      </NavigationList>
      <NavigationList>
        <NavigationListItem
          onClick={() => handleSelect({ terms: true })}
          selectable
          selected={selected.terms}
          icon={<TermsAndConditions />}
        >
          {company.terms && (
            <BrandedMenuItem title={company.terms.title} link={company.terms.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ gdpr: true })}
          selectable
          selected={selected.gdpr}
          icon={<TermsAndConditions />}
        >
          {company.gdpr_terms && (
            <BrandedMenuItem title={company.gdpr_terms.title} link={company.gdpr_terms.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ privacy: true })}
          selectable
          selected={selected.privacy}
          icon={<Security />}
        >
          {company.privacy && (
            <BrandedMenuItem title={company.privacy.title} link={company.privacy.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          onClick={() => handleSelect({ security: true })}
          selectable
          selected={selected.security}
          icon={<Security />}
        >
          {company.security && (
            <BrandedMenuItem title={company.security.title} link={company.security.link} />
          )}
        </NavigationListItem>
        <NavigationListItem
          icon={<Settings />}
          onClick={() => handleSelect({ cookies: true })}
          selectable
          selected={selected.cookies}
        >
          <MenuItem
            text={<Translate t="seo.content.title_cookies_settings" />}
            link="/pages/cookies_settings"
          />
        </NavigationListItem>
      </NavigationList>
    </section>
  );
};

export default Content;
