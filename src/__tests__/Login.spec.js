import React from "react";
import TestRenderer from "react-test-renderer";
import Login from "../components/Login";

describe("Login Component", () => {
  let component,
    tree;
  beforeAll(() => {
    component = TestRenderer.create(<Login />);
    tree = component.toJSON();
  });
  it("should match snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
  it("should have class name", () => {
    expect(tree.props.className).toEqual("login-form");
  });
  it("onSubmit should be a function", () => {
    expect(tree.props.onSubmit instanceof Function).toBeTruthy();
  });
});
