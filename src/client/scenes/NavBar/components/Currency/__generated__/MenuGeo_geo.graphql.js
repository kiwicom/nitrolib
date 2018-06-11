/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuGeo_geo$ref: FragmentReference;
export type MenuGeo_geo = {|
  +isoCountryCode: ?string,
  +$refType: MenuGeo_geo$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "MenuGeo_geo",
  "type": "GeoIP",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isoCountryCode",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '5776f2d25a51b304b9d0d21abea637b5';
module.exports = node;
