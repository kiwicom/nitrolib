// @flow strict

import * as React from "react";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import OrbitText from "@kiwicom/orbit-components/lib/Text";

import TranslateRef from "../../TranslateRef";
import Button from "../../Button/index";

type Props = {|
  email: string,
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  isLoading?: boolean,
|};

const AskForLink = ({ email, onAskSignInLink, isLoading }: Props) => (
  <ModalSection>
    <OrbitText spaceAfter="normal">
      <TranslateRef
        t="account.send_link_to"
        values={{ email }}
        render={() => <OrbitText weight="bold">{email}</OrbitText>}
      />
    </OrbitText>
    <Button
      t="account.ask_sign_in_link"
      type="secondary"
      onClick={onAskSignInLink}
      loading={isLoading}
      dataTest="MagicLogin-AskForMagic"
    />
  </ModalSection>
);

export default AskForLink;
