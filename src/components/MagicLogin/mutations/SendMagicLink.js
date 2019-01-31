// @flow

import { graphql } from "react-relay";

import { executeMutation } from "../../../services/utils/relay";
import type {
  SendMagicLinkMutationVariables,
  SendMagicLinkMutationResponse,
} from "./__generated__/SendMagicLinkMutation.graphql";

const sendMagicLink = graphql`
  mutation SendMagicLinkMutation($email: String!, $brand: Brand!) {
    sendMagicLink(email: $email, brand: $brand) {
      success
    }
  }
`;

export default (email: string, brand: string): Promise<SendMagicLinkMutationResponse> =>
  executeMutation<SendMagicLinkMutationVariables, SendMagicLinkMutationResponse>(sendMagicLink, {
    email,
    brand,
  });
