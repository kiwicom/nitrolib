// @flow strict

import { graphql, commitMutation, Environment } from "react-relay";

import type {
  sendMagicLinkMutationVariables,
  sendMagicLinkMutationResponse,
} from "./__generated__/sendMagicLinkMutation.graphql";

const sendMagicLinkMutation = graphql`
  mutation sendMagicLinkMutation($email: String!, $brand: Brand!) {
    sendMagicLink(email: $email, brand: $brand) {
      success
    }
  }
`;

const sendMagicLink = (
  environment: typeof Environment,
  email: string,
  brand: string,
): Promise<sendMagicLinkMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: sendMagicLinkMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: sendMagicLinkMutation,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default sendMagicLink;
