import React from "react";
import TestRenderer from "react-test-renderer";
import Report from "../components/Report";

describe("Report Component", () => {
  let component,
    tree,
    props = {
      className: "red",
      name: "some report name",
      description: "some description",
      coordinates: []
    };
  beforeAll(() => {
    component = TestRenderer.create(<Report {...props} />);
    tree = component.toJSON();
  });
  it("should match snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
  it("should match the class name", () => {
    expect(tree.children[0].props.className).toEqual("red card");
  });
});
