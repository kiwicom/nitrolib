// @flow strict
import * as React from "react";

import Text from "../../../Text";
import Button from "../../primitives/Button";
import type { Event } from "../../../../records/Event";

type Props = {|
  onOpen: () => void,
  onLog: (event: Event<"openFAQ">) => void,
|};

type State = {|
  shown: boolean,
|};

class Help extends React.Component<Props, State> {
  handleOpen = () => {
    const { onOpen, onLog } = this.props;

    onLog({ event: "openFAQ", data: null });
    onOpen();
  };

  render() {
    return (
      <>
        <Button onClick={this.handleOpen}>
          <Text t={__("common.help")} />
        </Button>
      </>
    );
  }
}

export default Help;
