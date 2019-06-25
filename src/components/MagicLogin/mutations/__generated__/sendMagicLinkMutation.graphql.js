/**
 * @flow
 * @relayHash f941ff8758d8f5bce374470d51b696b8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type sendMagicLinkMutationVariables = {|
  email: string,
  brand: any,
|};
export type sendMagicLinkMutationResponse = {|
  +sendMagicLink: ?{|
    +success: ?boolean
  |}
|};
export type sendMagicLinkMutation = {|
  variables: sendMagicLinkMutationVariables,
  response: sendMagicLinkMutationResponse,
|};
*/


/*
mutation sendMagicLinkMutation(
  $email: String!
  $brand: Brand!
) {
  sendMagicLink(email: $email, brand: $brand) {
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
    "type": "Brand!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "sendMagicLink",
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
    "concreteType": "SendMagicLinkResponse",
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
    "name": "sendMagicLinkMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "sendMagicLinkMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "sendMagicLinkMutation",
    "id": null,
    "text": "mutation sendMagicLinkMutation(\n  $email: String!\n  $brand: Brand!\n) {\n  sendMagicLink(email: $email, brand: $brand) {\n    success\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8ba2582c7645669606d934ee4fd09e3b';
module.exports = node;
