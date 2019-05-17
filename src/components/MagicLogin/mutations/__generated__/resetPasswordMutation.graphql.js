/**
 * @flow
 * @relayHash 901edd54c1ae0c82edccb97c99dc9539
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type resetPasswordMutationVariables = {|
  email: string,
  brand: string,
|};
export type resetPasswordMutationResponse = {|
  +resetPassword: ?{|
    +success: ?boolean
  |}
|};
export type resetPasswordMutation = {|
  variables: resetPasswordMutationVariables,
  response: resetPasswordMutationResponse,
|};
*/


/*
mutation resetPasswordMutation(
  $email: String!
  $brand: String!
) {
  resetPassword(email: $email, brand: $brand) {
    success
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
    "name": "brand",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "resetPassword",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "brand",
        "variableName": "brand",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email",
        "type": "String!"
      }
    ],
    "concreteType": "ResetPasswordResponse",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "success",
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
    "name": "resetPasswordMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "resetPasswordMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "resetPasswordMutation",
    "id": null,
    "text": "mutation resetPasswordMutation(\n  $email: String!\n  $brand: String!\n) {\n  resetPassword(email: $email, brand: $brand) {\n    success\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9bb947bb88a0d124ea41853665a8e5dd';
module.exports = node;
