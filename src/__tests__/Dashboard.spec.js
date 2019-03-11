import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import Dashboard from "../components/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

describe("Dashboard Component", () => {
  let component, tree;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
    component = TestRenderer.create(
      <Router>
        <Dashboard isValidLogin={true} />
      </Router>
    );
    tree = component.toJSON();    
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });
  it("should match snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
  it("should be a overlay loader before render the reports", () => {
    expect(tree.type).toBe("div");
    expect(tree.props.className).toBe("overlay");
  });
});
