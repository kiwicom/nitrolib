// @flow strict

import { commitMutationAsync, graphql } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  sendMagicLinkMutationVariables,
  sendMagicLinkMutationResponse,
  sendMagicLinkMutation,
} from "./__generated__/sendMagicLinkMutation.graphql";

const mutation = graphql`
  mutation sendMagicLinkMutation($email: String!, $brand: Brand!) {
    sendMagicLink(email: $email, brand: $brand) {
      success
    }
  }
`;

const sendMagicLink = (
  environment: Environment,
  email: string,
  brand: string,
): Promise<sendMagicLinkMutationResponse> => {
  const variables: sendMagicLinkMutationVariables = {
    email,
    brand,
  };
  return commitMutationAsync<sendMagicLinkMutation>(environment, {
    mutation,
    variables,
  }).then(({ response }) => response);
};

export default sendMagicLink;
