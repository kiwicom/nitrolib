# File templates

These are basic templates for convenient file creation.

## React

Component:
```js
// @flow strict
import * as React from "react";

type Props = {|
  // ...
|};

const Component = (props: Props) => (
  <></>
);

export default Component;
```

Test:
```js
// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Component from "../index";

describe("#Component", () => {
  test("render", () => {
    const wrapper = shallow(<Component />);

    expect(wrapper).toMatchSnapshot();
  });
});
```
