import axios from "axios";
import { login } from "../utils/utils";

describe("Utils file", () => {
  describe("Login method", () => {
    it("Should validate a valid and an invalid user", async () => {
      const users = {
        users: [
          {
            userName: "linoleum89",
            password: "linoleum",
            sector: 1
          },
          {
            userName: "splinter",
            password: "a1234nv",
            sector: 2
          }
        ]
      };
      const response = { userName: "linoleum89", sector: 1 };
      axios.get.mockImplementation(() => Promise.resolve({data: users} ));
      const user = await login({userName: 'linoleum89', password:'linoleum'});
      const user2 = await login();
      expect(user).toEqual(response);
      expect(user2).toEqual("Invalid user name or password");
    });
  });
});
