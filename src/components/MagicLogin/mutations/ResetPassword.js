// @flow

import { graphql } from "react-relay";

import { executeMutation } from "../../../services/utils/relay";
import type {
  ResetPasswordMutationVariables,
  ResetPasswordMutationResponse,
} from "./__generated__/ResetPasswordMutation.graphql";

const resetPassword = graphql`
  mutation ResetPasswordMutation($email: String!, $brand: String!) {
    resetPassword(email: $email, brand: $brand) {
      success
    }
  }
`;

export default (email: string, brand: string): Promise<ResetPasswordMutationResponse> =>
  executeMutation<ResetPasswordMutationVariables, ResetPasswordMutationResponse>(resetPassword, {
    email,
    brand,
  });
