
import { graphql, commitMutation } from "@kiwicom/relay";
import { Environment } from "@kiwicom/relay";

import {
  createSimpleTokenMutationVariables,
  createSimpleTokenMutationResponse,
} from "./__generated__/createSimpleTokenMutation.graphql";

const createSimpleTokenMutation = graphql`
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
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation: createSimpleTokenMutation,
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default createSimpleToken;
