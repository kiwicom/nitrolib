// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import NavBar from "../src/components/NavBar";
import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

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
      portal=""
      starred={<span>Starred</span>}
      onOpenFaq={action("Open FAQ")}
      onSetModal={action("Set modal")}
      onLogoClick={action("Click logo")}
      onSaveLanguage={action("Save language")}
      onSelectTrip={action("Select trip")}
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
      starred={<span>Starred</span>}
      inverted
      portal=""
      onOpenFaq={action("Open FAQ")}
      onLogoClick={action("Click logo")}
      onSetModal={action("Set modal")}
      onSaveLanguage={action("Save language")}
      onSelectTrip={action("Select trip")}
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
      starred={<span>Starred</span>}
      inverted
      portal=""
      onOpenFaq={action("Open FAQ")}
      onLogoClick={action("Click logo")}
      onSetModal={action("Set modal")}
      onSaveLanguage={action("Save language")}
      onSelectTrip={action("Select trip")}
    />
  ));
