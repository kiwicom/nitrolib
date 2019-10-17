// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import NavigationList, { NavigationListItem } from "@kiwicom/orbit-components/lib/NavigationList";
import Collapse from "@kiwicom/orbit-components/lib/Collapse";
import TextOrbit from "@kiwicom/orbit-components/lib/Text";

import { useIntl } from "../../../../services/intl/context";
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

const LinkFix = styled.div`
  a {
    display: inline-flex;
  }
`;

const Content = (props: Props) => {
  const { auth, onSignOut } = useAuth();
  const brand = useBrand();
  const company = getPagesItems(brand);
  const intl = useIntl();

  const {
    handleOpenDebug,
    onSaveLanguage,
    handleOpenSignIn,
    handleOpenSubscription,
    handleOpenRegister,
    onToggle,
    debug,
  } = props;

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

  return (
    <section data-test="NavBar-SideNav">
      {debug && (
        <Collapse
          label={
            <TextOrbit uppercase type="secondary">
              Dev features
            </TextOrbit>
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

      {auth === null ? (
        <NavigationList>
          <NavigationListItem
            selectable
            selected={selected.sign_in}
            onClick={() => {
              handleOpenSignIn();
              handleSelect({ sign_in: true });
            }}
          >
            <Translate html t="account.sign_in" />
          </NavigationListItem>
          <NavigationListItem
            selectable
            selected={selected.sign_up}
            onClick={() => {
              handleOpenRegister();
              handleSelect({ sign_up: true });
            }}
          >
            <Translate html t="account.sign_up" />
          </NavigationListItem>
        </NavigationList>
      ) : (
        <NavigationList>
          <LinkFix>
            <NavigationListItem href={`/${intl.language.id}/account#future`}>
              <Translate html t="account.my_bookings_action" />
            </NavigationListItem>
          </LinkFix>
        </NavigationList>
      )}

      <Collapse label={<Text uppercase type="secondary" t="sidenav.account_discover" />}>
        <NavigationList>
          {company.invite && (
            <NavigationListItem
              selectable
              onClick={() => handleSelect({ invite: true })}
              selected={selected.invite}
            >
              <BrandedMenuItem title={company.invite.title} link={company.invite.link} />
            </NavigationListItem>
          )}
          {brand.communication.newsletter.enabled && (
            <NavigationListItem
              onClick={() => handleSelect({ subscribe: true })}
              selectable
              selected={selected.subscribe}
            >
              <MenuItem
                onClick={handleOpenSubscription}
                text={<Translate t="common.subscribe" />}
              />
            </NavigationListItem>
          )}
          {company.stories && (
            <NavigationListItem
              onClick={() => handleSelect({ stories: true })}
              selectable
              selected={selected.stories}
            >
              <BrandedMenuItem title={company.stories.title} link={company.stories.link} />
            </NavigationListItem>
          )}
        </NavigationList>
      </Collapse>

      <Collapse label={<Text uppercase type="secondary" t="sidenav.account_guidelines" />}>
        <NavigationList>
          {company.terms && (
            <NavigationListItem
              onClick={() => handleSelect({ terms: true })}
              selectable
              selected={selected.terms}
            >
              <BrandedMenuItem title={company.terms.title} link={company.terms.link} />
            </NavigationListItem>
          )}

          {company.gdpr_terms && (
            <NavigationListItem
              onClick={() => handleSelect({ gdpr: true })}
              selectable
              selected={selected.gdpr}
            >
              <BrandedMenuItem title={company.gdpr_terms.title} link={company.gdpr_terms.link} />
            </NavigationListItem>
          )}

          {company.privacy && (
            <NavigationListItem
              onClick={() => handleSelect({ privacy: true })}
              selectable
              selected={selected.privacy}
            >
              <BrandedMenuItem title={company.privacy.title} link={company.privacy.link} />
            </NavigationListItem>
          )}

          {company.security && (
            <NavigationListItem
              onClick={() => handleSelect({ security: true })}
              selectable
              selected={selected.security}
            >
              <BrandedMenuItem title={company.security.title} link={company.security.link} />
            </NavigationListItem>
          )}

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
      <Collapse label={<Text uppercase type="secondary" t="sidenav.company" />}>
        <NavigationList>
          {company.about && (
            <NavigationListItem
              onClick={() => handleSelect({ about: true })}
              selectable
              selected={selected.about}
            >
              <BrandedMenuItem title={company.about.title} link={company.about.link} />
            </NavigationListItem>
          )}

          {company.careers && (
            <NavigationListItem
              onClick={() => handleSelect({ careers: true })}
              selectable
              selected={selected.careers}
            >
              <BrandedMenuItem title={company.careers.title} link={company.careers.link} />
            </NavigationListItem>
          )}

          {brand.id === "kiwicom" && (
            <NavigationListItem
              onClick={() => handleSelect({ care: true })}
              selectable
              selected={selected.care}
            >
              <MenuItem link="https://care.kiwi.com/" text="Care Kiwi.com" />
            </NavigationListItem>
          )}

          {brand.id === "kiwicom" && (
            <NavigationListItem
              onClick={() => handleSelect({ code: true })}
              selectable
              selected={selected.code}
            >
              <MenuItem link="https://code.kiwi.com/" text="Code Kiwi.com" />
            </NavigationListItem>
          )}

          {company.guarantee && (
            <NavigationListItem
              onClick={() => handleSelect({ guarantee: true })}
              selectable
              selected={selected.guarantee}
            >
              <BrandedMenuItem title={company.guarantee.title} link={company.guarantee.link} />
            </NavigationListItem>
          )}

          {company.media && (
            <NavigationListItem
              onClick={() => handleSelect({ media: true })}
              selectable
              selected={selected.media}
            >
              <BrandedMenuItem title={company.media.title} link="https://media.kiwi.com/" />
            </NavigationListItem>
          )}
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
