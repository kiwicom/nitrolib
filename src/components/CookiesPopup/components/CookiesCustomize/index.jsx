// @flow strict
import * as React from "react";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Button from "@kiwicom/orbit-components/lib/Button";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";

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
      <Modal size="small" onClose={onClose}>
        <ModalSection>
          <Heading>Cookie preferences</Heading>
          Necessary cookies
          <Radio label="Enabled" checked />
          Performance cookies
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
          Marketing cookies
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
          Third-Party advertisement
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
          <ButtonGroup>
            <Button onClick={this.handleAcceptAll} size="small">
              Accept all
            </Button>
            <Button onClick={this.handleAccept} size="small">
              Save settings
            </Button>
          </ButtonGroup>
        </ModalSection>
      </Modal>
    );
  }
}
export default CookiesCustomize;
