// @flow strict

import { graphql, commitMutation } from "react-relay";

import type {
  SendMagicLinkMutationVariables,
  SendMagicLinkMutationResponse,
} from "./__generated__/SendMagicLinkMutation.graphql";
import environment from "../../../services/environment";

const sendMagicLink = graphql`
  mutation SendMagicLinkMutation($email: String!, $brand: Brand!) {
    sendMagicLink(email: $email, brand: $brand) {
      success
    }
  }
`;

const SendMagicLink = (email: string, brand: string): Promise<SendMagicLinkMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: SendMagicLinkMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: sendMagicLink,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default SendMagicLink;
