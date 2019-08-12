// @flow strict
import * as React from "react";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import ModalHeader from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../../../../Translate";
import Text from "../../../../Text";
import IntlContext from "../../../../../services/intl/context";

type Props = {|
  email: string,
  pairedWith: "facebook" | "google",
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onSocialLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const BUTTON_ICON = {
  facebook: <FacebookIcon />,
  google: <GoogleIcon />,
};

const PROVIDER = {
  google: "Google",
  facebook: "Facebook",
};

const SocialLogin = ({ onAskSignInLink, onSocialLogin, email, pairedWith }: Props) => {
  const provider = PROVIDER[pairedWith];
  const intl = React.useContext(IntlContext);

  return (
    <>
      <ModalHeader
        title={intl.translate(__("account.login_title.paired_with_social"), { provider })}
        description={intl.translate(__("account.login_description.paired_with_social"), {
          provider,
        })}
        illustration={<Illustration name="Login" size="small" />}
      />
      <ModalSection dataTest="MagicLogin-SocialLogin">
        <Stack flex direction="column" spacing="condensed" desktop={{ direction: "row" }}>
          <Button type={pairedWith} bordered icon={BUTTON_ICON[pairedWith]} onClick={onSocialLogin}>
            <Translate t="account.log_in_with" values={{ provider: PROVIDER[pairedWith] }} />
          </Button>
        </Stack>
      </ModalSection>
      <ModalSection>
        <Text spaceAfter="normal" t="account.send_link_to" values={{ email }} />
        <Button type="secondary" onClick={onAskSignInLink}>
          <Translate t="account.ask_sign_in_link" />
        </Button>
      </ModalSection>
    </>
  );
};

export default SocialLogin;
