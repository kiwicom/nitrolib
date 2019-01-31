// @flow

import { graphql } from "react-relay";

import { executeMutation } from "../../../services/utils/relay";
import type {
  CheckEmailMutationVariables,
  CheckEmailMutationResponse,
} from "./__generated__/CheckEmailMutation.graphql";

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
  executeMutation<CheckEmailMutationVariables, CheckEmailMutationResponse>(checkEmail, {
    email,
    brand,
  });
