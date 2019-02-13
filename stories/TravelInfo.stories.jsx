// // @flow strict
// import * as React from "react";
// import { storiesOf } from "@storybook/react";

// import TravelInfo from "../src/components/TravelInfo";
// import withData from "./decorators/withData";

// const props = {
//   travelArrangement: {
//     takeOff: {
//       from: "Prague, Czech Republic",
//       to: "Denpasar, Bali",
//       stops: "0",
//       note: "Transfer to hotel NOT included",
//     },
//     landing: {
//       from: "Denpasar, Bali",
//       to: "Prague, Czech Republic",
//       stops: "2",
//       note: "Transfer to hotel NOT included",
//     },
//   },
//   travelDates: {
//     from: "Fri 20 Nov",
//     to: "Sun 4 Dec",
//   },
//   passengers: {
//     adults: 2,
//     children: 1,
//   },
// };

// storiesOf("TravelInfo", module)
//   .addDecorator(withData)
//   .add("default", () => <TravelInfo {...props} />);
