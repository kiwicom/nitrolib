// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";

import NavBar from "../src/components/NavBar";
import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

const logoClickAction = action("Click on logo");

storiesOf("NavBar", module)
  .addDecorator(withData)
  .add("default", () => (
    <NavBar
      headerLinks={
        <HeaderLinks
          linkFlights="https://www.kiwi.com/en/?headerLink=linkFlights"
          linkRooms="https://www.kiwi.com/en/?headerLink=linkRooms"
          linkCars="https://www.kiwi.com/en/?headerLink=linkCars"
          linkHolidays="https://www.kiwi.com/en/?headerLink=linkHolidays"
        />
      }
      chat={<h1>Chat</h1>}
      subscription={<h1>Subscription</h1>}
      debug={<h1>Debug</h1>}
      shadow={boolean("Shadow", true, GROUP_ID)}
      starred={<h1>Starred</h1>}
      onOpenFaq={action("Open FAQ")}
      onSetModal={action("Set modal")}
      onSaveLanguage={action("Save language")}
      onSelectTrip={action("Select trip")}
      onLogoClick={e => {
        e.preventDefault();
        logoClickAction(e);
      }}
    />
  ))
  .add("inverted", () => (
    <NavBar
      headerLinks={
        <HeaderLinks
          linkFlights="https://www.kiwi.com/en/?headerLink=linkFlights"
          linkRooms="https://www.kiwi.com/en/?headerLink=linkRooms"
          linkCars="https://www.kiwi.com/en/?headerLink=linkCars"
          linkHolidays="https://www.kiwi.com/en/?headerLink=linkHolidays"
        />
      }
      chat={<h1>Chat</h1>}
      subscription={<h1>Subscription</h1>}
      debug={<h1>Debug</h1>}
      shadow={boolean("Shadow", true, GROUP_ID)}
      starred={<span>Starred</span>}
      inverted
      onSaveLanguage={action("Save language")}
      onSelectTrip={action("Select trip")}
      onSetModal={action("Set modal")}
    />
  ));
