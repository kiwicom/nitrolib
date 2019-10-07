// @flow strict

import { commitMutationAsync, graphql } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  checkEmailMutationVariables,
  checkEmailMutationResponse,
  checkEmailMutation,
} from "./__generated__/checkEmailMutation.graphql";

const mutation = graphql`
  mutation checkEmailMutation($email: String!, $brand: Brand!) {
    checkEmail(email: $email, brand: $brand) {
      result {
        hasKiwiAccount
        hasFacebook
        hasGoogle
        hasBooking
      }
    }
  }
`;

export default (
  environment: Environment,
  email: string,
  brand: string,
): Promise<checkEmailMutationResponse> => {
  const variables: checkEmailMutationVariables = {
    email,
    brand,
  };

  return commitMutationAsync<checkEmailMutation>(environment, {
    mutation,
    variables,
  }).then(({ response }) => response);
};
