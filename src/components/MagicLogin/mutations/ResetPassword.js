// @flow strict

import { graphql, commitMutation } from "react-relay";

import type {
  ResetPasswordMutationVariables,
  ResetPasswordMutationResponse,
} from "./__generated__/ResetPasswordMutation.graphql";
import environment from "../../../services/environment";

const resetPassword = graphql`
  mutation ResetPasswordMutation($email: String!, $brand: String!) {
    resetPassword(email: $email, brand: $brand) {
      success
    }
  }
`;

const ResetPassword = (email: string, brand: string): Promise<ResetPasswordMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: ResetPasswordMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: resetPassword,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default ResetPassword;
