
import { graphql, commitMutation } from "@kiwicom/relay";
import { Environment } from "@kiwicom/relay";

import {
  sendMagicLinkMutationVariables,
  sendMagicLinkMutationResponse,
} from "./__generated__/sendMagicLinkMutation.graphql";

const sendMagicLinkMutation = graphql`
  mutation sendMagicLinkMutation($email: String!, $brand: Brand!) {
    sendMagicLink(email: $email, brand: $brand) {
      success
    }
  }
`;

const sendMagicLink = (
  environment: Environment,
  email: string,
  brand: string,
): Promise<sendMagicLinkMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: sendMagicLinkMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: sendMagicLinkMutation,
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default sendMagicLink;
