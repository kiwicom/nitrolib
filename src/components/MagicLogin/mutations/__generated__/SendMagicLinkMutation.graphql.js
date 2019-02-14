/**
 * @flow
 * @relayHash f9dd4537fa47ddf927a4459ef9fd006a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SendMagicLinkMutationVariables = {|
  email: string,
  brand: any,
|};
export type SendMagicLinkMutationResponse = {|
  +sendMagicLink: ?{|
    +success: ?boolean
  |}
|};
export type SendMagicLinkMutation = {|
  variables: SendMagicLinkMutationVariables,
  response: SendMagicLinkMutationResponse,
|};
*/


/*
mutation SendMagicLinkMutation(
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
    "name": "SendMagicLinkMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SendMagicLinkMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "SendMagicLinkMutation",
    "id": null,
    "text": "mutation SendMagicLinkMutation(\n  $email: String!\n  $brand: Brand!\n) {\n  sendMagicLink(email: $email, brand: $brand) {\n    success\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c1e6dd92f852be1a64e6d7b5c4249b91';
module.exports = node;
