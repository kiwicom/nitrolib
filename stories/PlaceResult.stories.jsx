// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/react";

import environment from "client/services/environment";
import PlaceResult from "client/components/PlaceResult";

storiesOf("PlaceResult", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query PlaceResultQuery($id: String!) {
          location(id: $id) {
            ...PlaceResult_item
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
          <PlaceResult
            onClick={action("click")}
            item={res.props.location}
            selected={boolean("Selected", false)}
          />
        );
      }}
    />
  ));
