// @flow

import { graphql } from "react-relay";

import { executeMutation } from "../../../services/utils/relay";
import type {
  SignInMutationVariables,
  SignInMutationResponse,
} from "./__generated__/SignInMutation.graphql";

const checkEmail = graphql`
  mutation SignInMutation($email: String!, $password: String!, $brand: Brand!) {
    signIn(email: $email, password: $password, brand: $brand) {
      success
      user {
        ...SignInUser @relay(mask: false)
      }
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const userIndentity = graphql`
  fragment SignInUser on User @relay(mask: false) {
    token
    identity {
      id(opaque: false)
      email
      firstName
      lastName
      emailVerified
    }
  }
`;

export default (email: string, password: string, brand: string): Promise<SignInMutationResponse> =>
  executeMutation<SignInMutationVariables, SignInMutationResponse>(checkEmail, {
    email,
    password,
    brand,
  });
