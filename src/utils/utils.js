import axios from "axios";

export const login = async (userData = { userName: "", password: "" }) => {
  try {
    const response = await axios.get("data/users.json");
    const users = (response.data && response.data.users) || [];
    //simulating find method on the server side, response should return the user object only
    const user = users.find(user => {
      return (
        user.userName === userData.userName &&
        user.password === userData.password
      );
    });
    if (user) {
      delete user.password; //normally we won't have to do this since user object returns without password from api
      return user;
    } else {
      return "Invalid user name or password";
    }
  } catch (error) {
    //TODO: implement an error boundary component to display in case of error
    console.error(error);
  }
};

export const fetch_reports = async () => {
  try {
    const response = await axios.get("data/reports.json");
    const reports = (response.data && response.data.reports) || [];
    return reports;
  } catch (error) {
    //TODO: implement an error boundary component to display in case of error
    console.error(error);
  }
};

export const fetch_sectors = async () => {
  try {
    const response = await axios.get("data/sectors.json");
    const sectors = (response.data && response.data.sectors) || [];
    return sectors;
  } catch (error) {
    //TODO: implement an error boundary component to display in case of error
    console.error(error);
  }
};
