// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import NavigationList, { NavigationListItem } from "@kiwicom/orbit-components/lib/NavigationList";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";
import Collapse from "@kiwicom/orbit-components/lib/Collapse";
import TextOrbit from "@kiwicom/orbit-components/lib/Text";

import { useIntl } from "../../../../services/intl/context";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import { useBrand } from "../../../../services/brand/context";
import { useAuth } from "../../../../services/auth/context";
import { getPagesItems } from "./services/menu";
import Currency from "../../../Currency";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import Language from "../../../Language";
import Translate from "../../../Translate";
import Text from "../../../Text";

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

const Wrapper = styled.div`
  padding: 0 40px;
  cursor: pointer;
`;

const Content = (props: Props) => {
  const { auth, onSignOut } = useAuth();
  const brand = useBrand();
  const company = getPagesItems(brand);
  const intl = useIntl();

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
        <Collapse
          label={
            <Wrapper>
              <TextOrbit uppercase type="secondary">
                Dev features
              </TextOrbit>
            </Wrapper>
          }
        >
          <NavigationList>
            <NavigationListItem
              selected={selected.debug}
              selectable
              onClick={() => {
                handleOpenDebug();
                handleSelect({ debug: true });
              }}
            >
              Show debug window
            </NavigationListItem>
          </NavigationList>
        </Collapse>
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
        {auth === null ? (
          <>
            <NavigationListItem
              selectable
              selected={selected.sign_in}
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
              onClick={() => {
                handleOpenRegister();
                handleSelect({ sign_up: true });
              }}
            >
              <Translate t="account.sign_up" />
            </NavigationListItem>
          </>
        ) : (
          <NavigationListItem
            onClick={() => {
              window.location.href = `/${intl.language.id}/account#future`;
            }}
          >
            <TextOrbit weight="bold">
              <Translate html t="account.my_bookings_action" />
            </TextOrbit>
          </NavigationListItem>
        )}
      </NavigationList>
      <Collapse
        label={
          <Wrapper>
            <Text t="sidenav.account_connect" />
          </Wrapper>
        }
      >
        <NavigationList>
          <NavigationListItem
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
            selectable
            selected={selected.subscribe}
          >
            {brand.communication.newsletter.enabled && (
              <MenuItem
                onClick={handleOpenSubscription}
                text={<Translate t="common.subscribe" />}
              />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ stories: true })}
            selectable
            selected={selected.stories}
          >
            {company.stories && (
              <BrandedMenuItem title={company.stories.title} link={company.stories.link} />
            )}
          </NavigationListItem>
        </NavigationList>
      </Collapse>
      <Collapse
        label={
          <Wrapper>
            <Text uppercase type="secondary" t="sidenav.guidelines" />
          </Wrapper>
        }
      >
        <NavigationList>
          <NavigationListItem
            onClick={() => handleSelect({ terms: true })}
            selectable
            selected={selected.terms}
          >
            {company.terms && (
              <BrandedMenuItem title={company.terms.title} link={company.terms.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ gdpr: true })}
            selectable
            selected={selected.gdpr}
          >
            {company.gdpr_terms && (
              <BrandedMenuItem title={company.gdpr_terms.title} link={company.gdpr_terms.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ privacy: true })}
            selectable
            selected={selected.privacy}
          >
            {company.privacy && (
              <BrandedMenuItem title={company.privacy.title} link={company.privacy.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ security: true })}
            selectable
            selected={selected.security}
          >
            {company.security && (
              <BrandedMenuItem title={company.security.title} link={company.security.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
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
      </Collapse>
      <Collapse
        label={
          <Wrapper>
            <Text uppercase type="secondary" t="sidenav.company" />
          </Wrapper>
        }
      >
        <NavigationList>
          <NavigationListItem
            onClick={() => handleSelect({ about: true })}
            selectable
            selected={selected.about}
          >
            {company.about && (
              <BrandedMenuItem title={company.about.title} link={company.about.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ careers: true })}
            selectable
            selected={selected.careers}
          >
            {company.careers && (
              <BrandedMenuItem title={company.careers.title} link={company.careers.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ care: true })}
            selectable
            selected={selected.care}
          >
            {brand.id === "kiwicom" && (
              <MenuItem link="https://care.kiwi.com/" text="Care Kiwi.com" />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ code: true })}
            selectable
            selected={selected.code}
          >
            {brand.id === "kiwicom" && (
              <MenuItem link="https://code.kiwi.com/" text="Code Kiwi.com" />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ guarantee: true })}
            selectable
            selected={selected.guarantee}
          >
            {company.guarantee && (
              <BrandedMenuItem title={company.guarantee.title} link={company.guarantee.link} />
            )}
          </NavigationListItem>
          <NavigationListItem
            onClick={() => handleSelect({ media: true })}
            selectable
            selected={selected.media}
          >
            {company.media && (
              <BrandedMenuItem title={company.media.title} link="https://media.kiwi.com/" />
            )}
          </NavigationListItem>
        </NavigationList>
      </Collapse>
      {auth !== null && (
        <Wrapper
          onClick={() => {
            onSignOut();
            onToggle();
            handleSelect({ logout: true });
          }}
        >
          <Text type="critical" weight="bold" t="account.log_out" />
        </Wrapper>
      )}
    </section>
  );
};

export default Content;
