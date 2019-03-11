import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import Loader from "../components/Loader";

describe("Loader Component", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it("should match the snapshot", () => {
    const component = TestRenderer.create(<Loader>Loading...</Loader>);
    const tree = component.toJSON();
    expect(tree).toEqual('Loading...')
    expect(tree).toMatchSnapshot();
  });
});