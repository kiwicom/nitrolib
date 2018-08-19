// @flow srict
import { brandDefault } from "records/Brand";
import { getPagesItems, getSocialMediaItems } from "../menu";

describe("#Sidenav service menu", () => {
  test("filters social media", () => {
    const socialmedia = getSocialMediaItems(brandDefault);

    expect(socialmedia).toMatchSnapshot();
  });

  test("fetches company section", () => {
    const company = getPagesItems(brandDefault);

    expect(company).toMatchSnapshot();
  });
});
