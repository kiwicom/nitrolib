/**
 * @flow
 * @relayHash 52233c602fb91f0a97249b3cda8583ef
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
export type CreateAccountMutationVariables = {|
  brand: any,
  credentials: CreateAccountInput,
|};
export type CreateAccountMutationResponse = {|
  +createAccount: ?{|
    +success: ?boolean,
    +error: ?CreateAccountError,
  |}
|};
export type CreateAccountMutation = {|
  variables: CreateAccountMutationVariables,
  response: CreateAccountMutationResponse,
|};
*/


/*
mutation CreateAccountMutation(
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
    "name": "CreateAccountMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateAccountMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateAccountMutation",
    "id": null,
    "text": "mutation CreateAccountMutation(\n  $brand: Brand!\n  $credentials: CreateAccountInput!\n) {\n  createAccount(brand: $brand, credentials: $credentials) {\n    success\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '24cc5bc4bed6f571116030a88ca9198d';
module.exports = node;
