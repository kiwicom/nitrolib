// @flow strict

import { commitMutation, graphql } from "react-relay";

import type {
  checkEmailMutationVariables,
  checkEmailMutationResponse,
} from "./__generated__/checkEmailMutation.graphql";
import environment from "../../../services/environment";

const checkEmail = graphql`
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

export default (email: string, brand: string): Promise<checkEmailMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: checkEmailMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: checkEmail,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });
