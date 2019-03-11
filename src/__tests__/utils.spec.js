import axios from "axios";
import { login, fetch_reports, fetch_sectors } from "../utils/utils";

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
      axios.get.mockImplementation(() => Promise.resolve({ data: users }));
      const user = await login({
        userName: "linoleum89",
        password: "linoleum"
      });
      const user2 = await login();
      expect(user).toEqual(response);
      expect(user2).toEqual("Invalid user name or password");
    });
  });
  describe("Fetch reports", () => {
    it("should return the reports from service", async () => {
      const data = {
        reports: [
          {
            id: 1,
            name: "Reten en la cantera",
            description: "De norte a sur",
            coordinates: [],
            sector: 1
          },
          {
            id: 2,
            name: "Reten en la independencia",
            description: "De sur a norte antes de la deza y ulloa",
            coordinates: [200, 300],
            sector: 1
          }
        ]
      };
      axios.get.mockImplementation(() => Promise.resolve({ data: data }));
      const reports = await fetch_reports();
      expect(reports.length).toBe(2);
      expect(reports instanceof Array).toBeTruthy();
      expect(reports[0].coordinates instanceof Array).toBeTruthy();
    });
  });
  describe("Fetch sectors", () => {
    it("should return the sectors from service", async () => {
      const data = {
        sectors: [
          { id: "1", name: "San Felipe", className: "red" },
        ]
      };
      axios.get.mockImplementation(() => Promise.resolve({ data: data }));
      const sectors = await fetch_sectors();
      expect(sectors.length).toBe(1);
      expect(sectors instanceof Array).toBeTruthy();
      expect(typeof(sectors[0].name) === 'string').toBeTruthy();
      expect(sectors[0].name).toBe('San Felipe');
    });
  });
});
