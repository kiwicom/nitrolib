// @flow strict

import { commitMutation, graphql } from "react-relay";

import type {
  CheckEmailMutationVariables,
  CheckEmailMutationResponse,
} from "./__generated__/CheckEmailMutation.graphql";
import environment from "../../../services/environment";

const checkEmail = graphql`
  mutation CheckEmailMutation($email: String!, $brand: Brand!) {
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

export default (email: string, brand: string): Promise<CheckEmailMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: CheckEmailMutationVariables = {
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
