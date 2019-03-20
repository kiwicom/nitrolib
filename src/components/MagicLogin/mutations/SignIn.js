// @flow strict
import { graphql, commitMutation } from "react-relay";

import type {
  SignInMutationVariables,
  SignInMutationResponse,
} from "./__generated__/SignInMutation.graphql";
import environment from "../../../services/environment";

const checkEmail = graphql`
  mutation SignInMutation($email: String!, $password: String!, $brand: Brand!) {
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

const SignIn = (email: string, password: string, brand: string): Promise<SignInMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: SignInMutationVariables = {
      email,
      password,
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

export default SignIn;
