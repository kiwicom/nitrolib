// @flow strict
import { graphql, commitMutationAsync } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  signInMutationVariables,
  signInMutationResponse,
  signInMutation,
} from "./__generated__/signInMutation.graphql";

const mutation = graphql`
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
          searchApiToken
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

const signIn = (
  environment: Environment,
  variables: signInMutationVariables,
): Promise<signInMutationResponse> =>
  commitMutationAsync<signInMutation>(environment, {
    mutation,
    variables,
  }).then(({ response }) => response);

export default signIn;
