/**
 * @flow
 * @relayHash 92aec9293468a0c7d3b754bc5f94d2b0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckEmailMutationVariables = {|
  email: string,
  brand: any,
|};
export type CheckEmailMutationResponse = {|
  +checkEmail: ?{|
    +result: ?{|
      +hasKiwiAccount: ?boolean,
      +hasFacebook: ?boolean,
      +hasGoogle: ?boolean,
      +hasBooking: ?boolean,
    |}
  |}
|};
export type CheckEmailMutation = {|
  variables: CheckEmailMutationVariables,
  response: CheckEmailMutationResponse,
|};
*/


/*
mutation CheckEmailMutation(
  $email: String!
  $brand: Brand!
) {
  checkEmail(email: $email, brand: $brand) {
    result {
      hasKiwiAccount
      hasFacebook
      hasGoogle
      hasBooking
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
    "name": "brand",
    "type": "Brand!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "checkEmail",
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
      }
    ],
    "concreteType": "CheckEmailResponse",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "result",
        "storageKey": null,
        "args": null,
        "concreteType": "CheckEmailResult",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasKiwiAccount",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasFacebook",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasGoogle",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasBooking",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CheckEmailMutation",
  "id": null,
  "text": "mutation CheckEmailMutation(\n  $email: String!\n  $brand: Brand!\n) {\n  checkEmail(email: $email, brand: $brand) {\n    result {\n      hasKiwiAccount\n      hasFacebook\n      hasGoogle\n      hasBooking\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CheckEmailMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CheckEmailMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd73afcbffece54a1d2a5c6b2b6371817';
module.exports = node;
