/**
 * @flow
 * @relayHash cd73289ae621b792dce6ea31f2f4ccda
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ResetPasswordMutationVariables = {|
  email: string,
  brand: string,
|};
export type ResetPasswordMutationResponse = {|
  +resetPassword: ?{|
    +success: ?boolean
  |}
|};
export type ResetPasswordMutation = {|
  variables: ResetPasswordMutationVariables,
  response: ResetPasswordMutationResponse,
|};
*/


/*
mutation ResetPasswordMutation(
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
    "name": "ResetPasswordMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ResetPasswordMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ResetPasswordMutation",
    "id": null,
    "text": "mutation ResetPasswordMutation(\n  $email: String!\n  $brand: String!\n) {\n  resetPassword(email: $email, brand: $brand) {\n    success\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'afd7127f94b1911a4ebf474b5afaecf1';
module.exports = node;
