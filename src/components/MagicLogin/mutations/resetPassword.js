// @flow strict

import { graphql, commitMutation, Environment } from "react-relay";

import type {
  resetPasswordMutationVariables,
  resetPasswordMutationResponse,
} from "./__generated__/resetPasswordMutation.graphql";

const resetPasswordMutation = graphql`
  mutation resetPasswordMutation($email: String!, $brand: String!) {
    resetPassword(email: $email, brand: $brand) {
      success
    }
  }
`;

const resetPassword = (
  environment: typeof Environment,
  email: string,
  brand: string,
): Promise<resetPasswordMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: resetPasswordMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: resetPasswordMutation,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default resetPassword;
