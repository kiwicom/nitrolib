// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";

import Container from "client/components/Tab";
import Flex from "client/primitives/Flex";

storiesOf("Tabs", module)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <Flex>
      <Container id="tab1" active={boolean("Tab 1", false)} onClick={action("click")}>
        Tab 1
      </Container>
      <Container id="tab2" active={boolean("Tab 2", false)} onClick={action("click")}>
        Tab 2
      </Container>
      <Container id="tab3" active={boolean("Tab 3", false)} onClick={action("click")}>
        Tab 3
      </Container>
    </Flex>
  ));
