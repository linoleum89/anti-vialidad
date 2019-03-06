import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

describe("App", () => {
  let div;
  beforeAll(() => {
    div = document.createElement("div");
  });

  it("Request permission from notifications and should return granted access", () => {
    global.Notification = {
      requestPermission: jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          resolve("granted");
        });
      })
    };
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    global.Notification.requestPermission().then(value =>
      expect(value).toBe("granted")
    );
    expect(global.Notification.requestPermission).toBeCalled();
    expect(
      global.Notification.requestPermission() instanceof Promise
    ).toBeTruthy();
  });
});
