/**
 * @flow
 * @relayHash ac40e0e2a86777f957c0d33bc0bf05bf
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SignInMutationVariables = {|
  email: string,
  password: string,
  brand: any,
|};
export type SignInMutationResponse = {|
  +signIn: ?{|
    +success: ?boolean,
    +user: ?{|
      +token: ?string,
      +identity: ?{|
        +id: string,
        +email: ?string,
        +firstName: ?string,
        +lastName: ?string,
        +emailVerified: ?boolean,
      |},
    |},
  |}
|};
export type SignInMutation = {|
  variables: SignInMutationVariables,
  response: SignInMutationResponse,
|};
*/


/*
mutation SignInMutation(
  $email: String!
  $password: String!
  $brand: Brand!
) {
  signIn(email: $email, password: $password, brand: $brand) {
    success
    user {
      token
      identity {
        id(opaque: false)
        email
        firstName
        lastName
        emailVerified
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "brand",
    "type": "Brand!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "signIn",
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
        "name": "email",
        "variableName": "email",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password",
        "type": "String!"
      }
    ],
    "concreteType": "SignInResponse",
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
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "token",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "identity",
            "storageKey": null,
            "args": null,
            "concreteType": "Identity",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "opaque",
                    "value": false,
                    "type": "Boolean"
                  }
                ],
                "storageKey": "id(opaque:false)"
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "email",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "firstName",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lastName",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "emailVerified",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SignInMutation",
  "id": null,
  "text": "mutation SignInMutation(\n  $email: String!\n  $password: String!\n  $brand: Brand!\n) {\n  signIn(email: $email, password: $password, brand: $brand) {\n    success\n    user {\n      token\n      identity {\n        id(opaque: false)\n        email\n        firstName\n        lastName\n        emailVerified\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SignInMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SignInMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7b02f2ac4960ceae61c63e4e2c02053d';
module.exports = node;
