// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ModalOverlay from "../src/components/ModalOverlay";
import withData from "./decorators/withData";

storiesOf("ModalOverlay", module)
  .addDecorator(withData)
  .add("a basic modal", () => (
    <ModalOverlay onClose={action("On close")}>
      <div style={{ background: "white", height: 400, width: 400 }}>
        <h1 style={{ marginTop: 0 }}>Kek</h1>
      </div>
    </ModalOverlay>
  ));
