// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import SideNav from "..";

describe("#SideNav", () => {
  test("render", () => {
    const wrapper = shallow(
      <SideNav
        subscription={<div>subscription</div>}
        portal=""
        isOpenNav
        onToggle={jest.fn()}
        debug={<div>debug</div>}
        onOpenModal={jest.fn()}
        onSaveLanguage={jest.fn()}
        newDesign={false}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper.find("Drawer").exists()).toBe(true);
  });
});

// test("opens when clicked", () => {
//   const wrapper = shallow(
//     <SideNav
//       subscription={<div>subscription</div>}
//       portal=""
//       isOpenNav=""
//       onToggle={jest.fn()}
//       onOpenModal={jest.fn()}
//       onSaveLanguage={jest.fn()}
//       onSetModal={jest.fn()}
//     />,
//   );

//   wrapper
//     .find("SideNav__MenuOpen")
//     .props()
//     .onClick();

//   expect(wrapper.find("SideBar").prop("shown")).toBe(true);
// });

// test("opens subscription", () => {
//   const setModal = jest.fn();
//   const wrapper = shallow(
//     <SideNav
//       subscription={<div>subscription</div>}
//       portal=""
//       isOpenNav=""
//       onToggle={jest.fn()}
//       onOpenModal={jest.fn()}
//       onSaveLanguage={jest.fn()}
//       onSetModal={setModal}
//     />,
//   );

//   wrapper
//     .find("MenuGroup")
//     .at(2)
//     .childAt(1)
//     .props()
//     .onClick();

//   expect(wrapper.find("ModalSection").contains("subscription")).toBe(true);
//   expect(setModal).toBeCalledTimes(1);
//   expect(setModal).toBeCalledWith("subscription");
// });

// test("opens debug", () => {
//   const setModal = jest.fn();
//   const wrapper = shallow(
//     <SideNav
//       subscription={<div>subscription</div>}
//       portal=""
//       isOpenNav=""
//       onToggle={jest.fn()}
//       debug={<div>debug</div>}
//       onOpenModal={jest.fn()}
//       onSaveLanguage={jest.fn()}
//       onSetModal={setModal}
//     />,
//   );

//   wrapper
//     .find("MenuGroup")
//     .at(0)
//     .childAt(0)
//     .props()
//     .onClick();

//   expect(wrapper.find("ModalSection").contains("debug")).toBe(true);
//   expect(setModal).toBeCalledTimes(1);
//   expect(setModal).toBeCalledWith("debug");
// });

// test("calls handlers when toggles", () => {
//   const setModal = jest.fn();
//   const wrapper = shallow(
//     <SideNav
//       subscription={<div>subscription</div>}
//       portal=""
//       isOpenNav=""
//       onToggle={jest.fn()}
//       onOpenModal={jest.fn()}
//       onSaveLanguage={jest.fn()}
//       onSetModal={setModal}
//     />,
//   );
//   wrapper
//     .find("Open navigation menu")
//     .props()
//     .onClick();

//   expect(setModal).toBeCalledWith("sideNav");

//   setModal.mockClear();

//   wrapper
//     .find("Open navigation menu")
//     .props()
//     .onClick();

//   expect(setModal).toBeCalledWith("");
// });
