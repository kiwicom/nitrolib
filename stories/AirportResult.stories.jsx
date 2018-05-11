// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/react";

import environment from "client/services/environment";
import AirportResult from "client/components/AirportResult";

storiesOf("AirportResult", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query AirportResultQuery($id: String!) {
          location(id: $id) {
            ...AirportResult_item
          }
        }
      `}
      variables={{ id: text("ID", "VIE") }}
      render={res => {
        if (res.error) {
          return <h1>Error: {String(res.error)}</h1>;
        }

        if (!res.props) {
          return <h2>Loading...</h2>;
        }

        return (
          // $FlowExpected - Relay :(
          <AirportResult
            onClick={action("click")}
            item={res.props.location}
            selected={boolean("Selected", false)}
          />
        );
      }}
    />
  ));
