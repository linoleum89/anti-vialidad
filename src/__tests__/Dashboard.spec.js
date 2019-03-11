import React from "react";
import TestRenderer from "react-test-renderer";
import Dashboard from "../components/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

describe("Dashboard Component", () => {
  let component,
    tree;
  beforeAll(() => {
    component = TestRenderer.create(<Router><Dashboard isValidLogin={true} /></Router>);
    tree = component.toJSON();
  });
  it("should match snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
  it("should be a type of h1", () => {
    expect(tree.type).toBe('h1');
  });
});
