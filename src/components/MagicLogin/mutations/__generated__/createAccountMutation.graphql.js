/**
 * @flow
 * @relayHash a3530f56fcd75d62b0f2654567d95bca
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateAccountError = "ACCOUNT_EXISTS" | "INVALID_EMAIL" | "WEAK_PASSWORD" | "%future added value";
export type CreateAccountInput = {|
  email: string,
  password: string,
  login?: ?string,
  firstName?: ?string,
  lastName?: ?string,
|};
export type createAccountMutationVariables = {|
  brand: any,
  credentials: CreateAccountInput,
|};
export type createAccountMutationResponse = {|
  +createAccount: ?{|
    +success: ?boolean,
    +error: ?CreateAccountError,
  |}
|};
export type createAccountMutation = {|
  variables: createAccountMutationVariables,
  response: createAccountMutationResponse,
|};
*/


/*
mutation createAccountMutation(
  $brand: Brand!
  $credentials: CreateAccountInput!
) {
  createAccount(brand: $brand, credentials: $credentials) {
    success
    error
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "brand",
    "type": "Brand!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "credentials",
    "type": "CreateAccountInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createAccount",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "brand",
        "variableName": "brand",
        "type": "Brand"
      },
      {
        "kind": "Variable",
        "name": "credentials",
        "variableName": "credentials",
        "type": "CreateAccountInput!"
      }
    ],
    "concreteType": "CreateAccountResponse",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "success",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "error",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createAccountMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "createAccountMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "createAccountMutation",
    "id": null,
    "text": "mutation createAccountMutation(\n  $brand: Brand!\n  $credentials: CreateAccountInput!\n) {\n  createAccount(brand: $brand, credentials: $credentials) {\n    success\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5710f38f6dcb466975951e613bad1a11';
module.exports = node;
