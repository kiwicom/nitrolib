// @flow

import "isomorphic-unfetch";
import * as React from "react";
import styled, { css } from "styled-components";
import Clipboard from "react-clipboard.js";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import ShareIcon from "@kiwicom/orbit-components/lib/icons/Share";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import Link from "@kiwicom/orbit-components/lib/icons/Link";
import Text from "@kiwicom/orbit-components/lib/Text";
import ClickOutside from "@kiwicom/nitro/lib/components/ClickOutside";
import Translate from "@kiwicom/nitro/lib/components/Translate";

import CloseByKey from "./CloseOnEscape";
import media from "../media";
import { NotificationContext } from "../notification/NotificationStore";
import { sendEvent } from "../logs/marketingHelpers";
import { fetchShortenUrl } from "./helpers";

type Props = {
  url: string,
  quote: string,
};

type State = {
  isOpen: boolean,
  top: number,
  left: number,
  shortenUrl: ?string,
};

const ICON_SIZE = 68;

const Wrapper = styled.div`
  position: relative;
`;

const Popup = styled.div`
  z-index: ${({ theme }) => theme.orbit.zIndexSticky};
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.md.max`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  `};

  ${media.md.min`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
    transform: translateX(-100%) translateY(-40%);
  `};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.orbit.zIndexModalOverlay};
  background-color: ${({ theme }) => `rgba(0, 0, 0, ${1 - Number(theme.orbit.opacityOverlay)})`};

  ${media.md.min`
    display: none;
  `};
`;

const Content = styled.div`
  ${({ theme: { orbit } }) => css`
    position: relative;
    z-index: ${orbit.zIndexModal};
    width: 100%;
    min-width: 230px;
    max-width: 270px;
    margin: ${orbit.spaceMedium};
    padding: ${orbit.spaceLarge} ${orbit.spaceMedium};
    border-color: ${orbit.borderColorModal};
    border-style: ${orbit.borderStyleCard};
    border-width: ${orbit.borderWidthCard};
    border-radius: ${orbit.borderRadiusLarge};
    background: ${orbit.backgroundModal};
    box-shadow: ${orbit.boxShadowModal};

    ${media.md.min`
      padding: ${orbit.spaceLarge};
      box-shadow: ${orbit.boxShadowElevatedLevel1};

      :after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        background-color: inherit;
        top: calc(50% - 10px);
        right: -10px;
        box-shadow: 2px -2px 3px 0 rgba(0,0,0,.1);
        z-index: 2;
      }
    `};
  `};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFacebookIcon = styled(FacebookIcon)`
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  cursor: pointer;
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  cursor: pointer;
`;

const StyledClipboard = styled(Clipboard)`
  padding: 0;
  background: none;
  border: 0;
`;

const CopyIcon = styled.div`
  ${({ theme: { orbit } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    border-radius: ${orbit.borderRadiusNormal};
    background: ${orbit.backgroundButtonSecondary};
    cursor: pointer;

    &:hover {
      background: ${orbit.backgroundButtonSecondaryHover};
    }
  `};
`;

const ButtonLabel = styled.div`
  margin: ${({ theme }) => theme.orbit.spaceSmall} 0;
`;

const socialMedia = [
  {
    id: "facebook",
    label: __("holidays.share.facebook"),
    component: FacebookShareButton,
    icon: StyledFacebookIcon,
  },
  {
    id: "twitter",
    label: __("holidays.share.twitter"),
    component: TwitterShareButton,
    icon: StyledTwitterIcon,
  },
  { id: "copy", label: __("holidays.share.url") },
];

const SocialMediaButtons = ({ shortenUrl, quote, onCopy, onCopyError }) => (
  <Buttons>
    {socialMedia.map(Item => (
      <React.Fragment key={Item.id}>
        {Item.component ? (
          <Item.component url={shortenUrl} quote={quote}>
            <Item.icon size={ICON_SIZE} />
            <ButtonLabel>
              <Text type="secondary" align="center">
                <Translate t={Item.label} />
              </Text>
            </ButtonLabel>
          </Item.component>
        ) : (
          <StyledClipboard
            data-clipboard-text={shortenUrl}
            onSuccess={onCopy}
            onError={onCopyError}
          >
            <>
              <CopyIcon>
                <Link size="large" />
              </CopyIcon>
              <ButtonLabel>
                <Text type="secondary" align="center">
                  <Translate t={Item.label} />
                </Text>
              </ButtonLabel>
            </>
          </StyledClipboard>
        )}
      </React.Fragment>
    ))}
  </Buttons>
);

class Share extends React.Component<Props, State> {
  state = {
    isOpen: false,
    top: 0,
    left: 0,
    shortenUrl: "",
  };

  inputRef: { current: HTMLInputElement | null } = React.createRef();

  shareButtonRef: { current: HTMLDivElement | null } = React.createRef();

  static contextType = NotificationContext;

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.isOpen && this.state.isOpen !== prevState.isOpen) {
      this.afterPopupOpen();
    }
  }

  afterPopupOpen() {
    if (!this.shareButtonRef.current) return;
    const { top, left } = this.shareButtonRef.current.getBoundingClientRect();
    this.setState({ top, left });
  }

  preSelect = () => {
    const el = this.inputRef.current;
    if (el) {
      el.focus();
      el.select();
      el.setSelectionRange(0, 9999);
    }
  };

  onClipboardCopy = () => {
    this.closePopup();
    this.context.setNotification({
      id: "shareCopy",
      type: "success",
      title: <Translate t="holidays.share.success_message" />,
      ttl: 3500,
    });
  };

  closePopup = () => {
    this.setState({ isOpen: false });
  };

  openPopup = async () => {
    sendEvent("sharePackage");
    const shortenUrl = await fetchShortenUrl(this.props.url);
    this.setState({ isOpen: true, shortenUrl });
  };

  render() {
    const { quote } = this.props;
    const { isOpen, top, left, shortenUrl } = this.state;

    return (
      <Wrapper ref={this.shareButtonRef}>
        <ButtonLink type="secondary" iconRight={<ShareIcon />} onClick={this.openPopup}>
          <Translate t="holidays.share.button" />
        </ButtonLink>
        {isOpen && (
          <Portal element="modal-portal">
            <ClickOutside onClickOutside={this.closePopup}>
              <Popup top={top} left={left}>
                <Overlay onClick={this.closePopup} />
                <Content>
                  <SocialMediaButtons
                    shortenUrl={shortenUrl}
                    quote={quote}
                    onCopy={this.onClipboardCopy}
                    onCopyError={this.preSelect}
                  />
                  <InputField
                    ref={this.inputRef}
                    value={shortenUrl}
                    readOnly
                    onFocus={this.preSelect}
                  />
                </Content>
              </Popup>
            </ClickOutside>
            <CloseByKey onClose={this.closePopup} />
          </Portal>
        )}
      </Wrapper>
    );
  }
}

export default Share;
