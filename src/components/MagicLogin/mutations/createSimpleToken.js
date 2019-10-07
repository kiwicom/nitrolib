// @flow strict

import { graphql, commitMutationAsync } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  createSimpleTokenMutation,
  createSimpleTokenMutationVariables,
  createSimpleTokenMutationResponse,
} from "./__generated__/createSimpleTokenMutation.graphql";

const mutation = graphql`
  mutation createSimpleTokenMutation($input: CreateSimpleTokenInput!) {
    createSimpleToken(input: $input) {
      ... on SimpleToken {
        token
      }
      ... on SimpleTokenError {
        code
      }
    }
  }
`;

const createSimpleToken = (
  environment: Environment,
  variables: createSimpleTokenMutationVariables,
): Promise<createSimpleTokenMutationResponse> =>
  commitMutationAsync<createSimpleTokenMutation>(environment, {
    mutation,
    variables,
  }).then(({ response }) => response);

export default createSimpleToken;
