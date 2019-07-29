import * as React from "react";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import Cookie from "./components/Cookie";
import Translate from "../../../Translate";

type Props = {
  onAccept: ({
    performance: boolean,
    marketing: boolean,
    advertisement: boolean,
  }) => void,
  onClose: () => void,
};

type State = {
  performance: boolean,
  marketing: boolean,
  advertisement: boolean,
};

class CookiesCustomize extends React.PureComponent<Props, State> {
  state = {
    performance: false,
    marketing: false,
    advertisement: false,
  };

  handleAcceptAll = () => {
    this.setState(
      {
        performance: true,
        marketing: true,
        advertisement: true,
      },
      this.handleAccept,
    );
  };

  handleAccept = () => {
    const { performance, marketing, advertisement } = this.state;
    const { onAccept } = this.props;

    onAccept({
      performance,
      marketing,
      advertisement,
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
          <Heading spaceAfter="medium">
            <Translate t="seo.content.title_cookies_settings" />
          </Heading>
          <Text type="secondary" spaceAfter="large">
            <Translate t="content.cookies_settings.general.content" />
          </Text>
          <Separator spaceAfter="medium" />
          {/* Necessary cookies */}
          <Stack spaceAfter="large">
            <Cookie
              category={__("content.cookies_settings.necessary.title")}
              description={__("content.cookies_settings.necessary.description")}
            >
              <Stack spaceAfter="large">
                <Radio label="Enabled" checked disabled />
              </Stack>
            </Cookie>
            {/* Performance cookies */}
            <Cookie
              category={__("content.cookies_settings.performance.title")}
              description={__("content.cookies_settings.performance.description")}
            >
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
            </Cookie>
            {/* Marketing cookies */}
            <Cookie
              category={__("content.cookies_settings.marketing.title")}
              description={__("content.cookies_settings.marketing.description")}
            >
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
            </Cookie>
            {/* Third-party marketing cookies */}
            <Cookie
              category={__("content.cookies_settings.third_party_marketing.title")}
              description={__("content.cookies_settings.third_party_marketing.description")}
              borderOff
            >
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
            </Cookie>
          </Stack>
          <ButtonGroup>
            <Stack justify="end">
              <Button onClick={this.handleAccept} size="small" type="secondary">
                <Text weight="bold">
                  <Translate t="content.cookies_settings.general.save_settings" />
                </Text>
              </Button>
              <Button onClick={this.handleAcceptAll} size="small">
                <Text type="white" weight="bold">
                  <Translate t="content.cookies_settings.general.accept_all" />
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
