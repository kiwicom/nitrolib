/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SignInUser$ref: FragmentReference;
export type SignInUser = {
  +token: ?string,
  +identity: ?{
    +id: string,
    +email: ?string,
    +firstName: ?string,
    +lastName: ?string,
    +emailVerified: ?boolean,
  },
};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "SignInUser",
  "type": "User",
  "metadata": {
    "mask": false
  },
  "argumentDefinitions": [],
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
};
// prettier-ignore
(node/*: any*/).hash = '11bbf57e424cf01290f64fe8554859c0';
module.exports = node;
