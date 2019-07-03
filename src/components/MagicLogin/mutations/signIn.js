// @flow strict
import { graphql, commitMutation } from "@kiwicom/relay";

import type {
  signInMutationVariables,
  signInMutationResponse,
} from "./__generated__/signInMutation.graphql";
import environment from "../../../services/environment";

const signInMutation = graphql`
  mutation signInMutation($email: String!, $password: String!, $brand: Brand!) {
    signIn(email: $email, password: $password, brand: $brand) {
      success
      user {
        token
        identity {
          id(opaque: false)
          email
          firstName
          lastName
          emailVerified
        }
        bookingIdentity {
          discounts {
            card
            credits
          }
          affiliateId
          balances {
            amount
            currencyId
          }
        }
      }
    }
  }
`;

const signIn = (email: string, password: string, brand: string): Promise<signInMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: signInMutationVariables = {
      email,
      password,
      brand,
    };

    commitMutation(environment, {
      mutation: signInMutation,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default signIn;
