// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../../../Translate";

const CookieContainer = styled.div`
  margin-bottom: 15px;
`;

const CookieHeader = styled.div`
  border-bottom: 1px solid
    ${({ theme }: ThemeProps) => theme.orbit.borderColorModal};
`;

const CookieDescription = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }: ThemeProps) => theme.orbit.borderColorModal};

  ${mq.tablet(css`
    width: 65%;
  `)};
`;

const CookieRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-top: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};

  ${mq.tablet(css`
    flex-direction: row;
  `)};

  &:last-of-type {
    ${CookieDescription} {
      border-bottom: none;
    }
  }
`;

const CookieCategory = styled.div`
  width: 100%;
  padding-right: 10px;

  ${mq.tablet(css`
    width: 35%;
  `)};
`;

type Props = {|
  onAccept: ({|
    performance: boolean,
    marketing: boolean,
    advertisement: boolean
  |}) => void,
  onClose: () => void
|};

type State = {|
  performance: boolean,
  marketing: boolean,
  advertisement: boolean
|};

class CookiesCustomize extends React.PureComponent<Props, State> {
  state = {
    performance: false,
    marketing: false,
    advertisement: false
  };

  handleAcceptAll = () => {
    this.setState({
      performance: true,
      marketing: true,
      advertisement: true
    });
  };

  handleAccept = () => {
    const { performance, marketing, advertisement } = this.state;
    const { onAccept } = this.props;

    onAccept({
      performance,
      marketing,
      advertisement
    });
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [ev.target.name]: ev.target.value === "1" });
  };

  render() {
    const { onClose } = this.props;
    const { performance, marketing, advertisement } = this.state;

    return (
      <Modal onClose={onClose}>
        <ModalSection>
          <CookieContainer>
            <CookieHeader>
              <Heading spaceAfter="medium">
                <Translate t="seo.content.title_cookies_settings" />
              </Heading>
              <Text type="secondary" spaceAfter="large">
                <Translate t="content.cookies_settings.general.content" />
              </Text>
            </CookieHeader>
            <CookieRow>
              <CookieCategory>
                <Text weight="bold" spaceAfter="small">
                  <Translate t="content.cookies_settings.necessary.title" />
                </Text>
              </CookieCategory>
              <CookieDescription>
                <Text spaceAfter="medium" size="small">
                  <Translate t="content.cookies_settings.necessary.description" />
                </Text>
                <Stack spaceAfter="large">
                  <Radio label="Enabled" checked disabled />
                </Stack>
              </CookieDescription>
            </CookieRow>
            <CookieRow>
              <CookieCategory>
                <Text weight="bold" spaceAfter="small">
                  <Translate t="content.cookies_settings.performance.title" />
                </Text>
              </CookieCategory>
              <CookieDescription>
                <Text spaceAfter="medium" size="small">
                  <Translate t="content.cookies_settings.performance.description" />
                </Text>
                <Stack inline spaceAfter="large">
                  <Radio
                    label="Enabled"
                    checked={performance}
                    name="performance"
                    value="1"
                    onChange={this.handleChange}
                  />{" "}
                  <Radio
                    label="Disabled"
                    checked={!performance}
                    name="performance"
                    value="0"
                    onChange={this.handleChange}
                  />
                </Stack>
              </CookieDescription>
            </CookieRow>
            <CookieRow>
              <CookieCategory>
                <Text weight="bold" spaceAfter="small">
                  <Translate t="content.cookies_settings.marketing.title" />
                </Text>
              </CookieCategory>
              <CookieDescription>
                <Text spaceAfter="medium" size="small">
                  <Translate t="content.cookies_settings.marketing.description" />
                </Text>
                <Stack inline spaceAfter="large">
                  <Radio
                    label="Enabled"
                    checked={marketing}
                    name="marketing"
                    value="1"
                    onChange={this.handleChange}
                  />{" "}
                  <Radio
                    label="Disabled"
                    checked={!marketing}
                    name="marketing"
                    value="0"
                    onChange={this.handleChange}
                  />
                </Stack>
              </CookieDescription>
            </CookieRow>
            <CookieRow>
              <CookieCategory>
                <Text weight="bold" spaceAfter="small">
                  <Translate t="content.cookies_settings.third_party_marketing.title" />
                </Text>
              </CookieCategory>
              <CookieDescription>
                <Text spaceAfter="medium" size="small">
                  <Translate t="content.cookies_settings.third_party_marketing.description" />
                </Text>
                <Stack inline spaceAfter="large">
                  <Radio
                    label="Enabled"
                    checked={advertisement}
                    name="advertisement"
                    value="1"
                    onChange={this.handleChange}
                  />{" "}
                  <Radio
                    label="Disabled"
                    checked={!advertisement}
                    name="advertisement"
                    value="0"
                    onChange={this.handleChange}
                  />
                </Stack>
              </CookieDescription>
            </CookieRow>
          </CookieContainer>
          <ButtonGroup>
            <Stack justify="end">
              <Button onClick={this.handleAcceptAll} size="small">
                <Text type="white" weight="bold">
                  <Translate t="content.cookies_settings.general.accept_all" />
                </Text>
              </Button>
              <Button onClick={this.handleAccept} size="small" type="secondary">
                <Text weight="bold">
                  <Translate t="content.cookies_settings.general.save_settings" />
                </Text>
              </Button>
            </Stack>
          </ButtonGroup>
        </ModalSection>
      </Modal>
    );
  }
}
export default CookiesCustomize;
