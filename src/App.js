import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import { Button, Container, Row, Navbar, ButtonGroup } from "react-bootstrap";
import Login from "./components/Login";
import Preferences from "./components/Preferences";
import ReportForm from "./components/ReportForm";
import Dashboard from "./components/Dashboard";
import Loader from "./components/Loader";
import WithModal from "./components/WithModal";
import PreferencesContext from "./preferences-context";
import { login } from "./utils/utils";

const WithModalPreferences = WithModal(Preferences);
const WithModalReport = WithModal(ReportForm);

class App extends Component {
  _isMounted = false;
  constructor(...args) {
    super(...args);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPreferences = this.handleSubmitPreferences.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNotifications = this.handleNotifications.bind(this);
    this.handleSector = this.handleSector.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      isLoading: false,
      allowNotifications: false,
      show: false,
      isValidLogin: null,
      isFormValid: false,
      currentModal: "",
      user: {},
      entry: {
        name: "",
        description: "",
        coordinates: [],
        sector: ""
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;
    global.Notification.requestPermission().then((permission = "") => {
      if (this._isMounted) {
        this.setState({
          allowNotifications: permission === "granted"
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmitLogin(userData = {}) {
    //send userData to api login service, simulating call here
    this.setState(() => {
      return {
        isLoading: true
      };
    });
    setTimeout(async () => {
      const user = (await login(userData)) || "";
      this.setState({
        isValidLogin: typeof user === "object",
        user: user && typeof user !== "string" ? user : {},
        isLoading: false
      });
    }, 1000);
  }

  handleNotifications(ev) {
    this.setState({
      allowNotifications: ev.target.checked
    });
  }

  handleSector(ev) {
    this.setState({
      user: {
        ...this.state.user,
        sector: ev.target.value
      }
    });
  }

  handleClose(ev) {
    let state = { show: false, isFormValid: false };
    if (this.state.currentModal === "report") {
      state.entry = {
        name: "",
        description: "",
        coodinartes: [],
        sector: ""
      };
    }
    this.setState(state);
  }

  handleShow(ev) {
    this.setState({ show: true, currentModal: ev.target.name });
  }

  handleSubmitPreferences(ev) {
    ev.preventDefault();
    //call endpoint, save data to a database, etc..
    this.setState({
      show: false
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState(state => {
      if (this.state.allowNotifications) {
        const options = {
          body: state.entry.description
        };

        const notification = new Notification(state.entry.name, options);

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
      return {
        show: false,
        isFormValid: false,
        entries: [
          ...this.state.entries,
          {
            id: this.state.entries.length + 1,
            name: state.entry.name,
            description: state.entry.description,
            coordinates: state.entry.coordinates || [],
            sector: parseInt(state.entry.sector) || 0
          }
        ]
      };
    });
  }

  handleChange(ev) {
    const value = ev.target.value;
    let state = { entry: {} };
    switch (ev.target.name) {
      case "name":
        state.entry = { ...this.state.entry, name: value };
        break;
      case "description":
        state.entry = { ...this.state.entry, description: value };
        break;
      case "sector":
        state.entry = { ...this.state.entry, sector: value || "" };
        break;
      default:
        return this.state;
    }

    state.isFormValid =
      state.entry.name !== "" && state.entry.description !== "";

    this.setState(state);
  }

  handleLogout() {
    this.setState({
      allowNotifications: false,
      show: false,
      isValidLogin: null,
      isFormValid: false,
      currentModal: "",
      user: {},
      entry: {
        name: "",
        description: "",
        coordinates: [],
        sector: ""
      }
    });
  }

  render() {
    return (
      <Router>
        <Container fluid={true}>
          <Navbar fixed="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              Anti-Vialidad{" "}
              {this.state.user &&
                this.state.user.userName &&
                `| Welcome ${this.state.user.userName}`}
            </Navbar.Brand>
            {this.state.user && this.state.user.userName && (
              <ButtonGroup>
                <Button variant="info" name="sectors" onClick={this.handleShow}>
                  Sectors
                </Button>
                <Button
                  variant="danger"
                  name="report"
                  onClick={this.handleShow}
                >
                  Report
                </Button>
                <Button variant="primary" name="pref" onClick={this.handleShow}>
                  Preferences
                </Button>
                <Button variant="light" onClick={this.handleLogout}>
                  Logout
                </Button>
              </ButtonGroup>
            )}
          </Navbar>
          <Row className="margin-top">
            <Route
              path="/"
              exact
              component={() => (
                <Login
                  handleSubmitLogin={this.handleSubmitLogin}
                  isValidLogin={this.state.isValidLogin}
                />
              )}
            />
            {this.state.isLoading ? (
              <Loader>
                <div className="overlay">
                  <h1>Login...</h1>
                </div>
              </Loader>
            ) : (
              <Route
                path="/dashboard"
                component={() => (
                  <Dashboard isValidLogin={this.state.isValidLogin} />
                )}
              />
            )}
          </Row>
          <PreferencesContext.Provider
            value={{
              allowNotifications: this.state.allowNotifications,
              handleNotifications: this.handleNotifications,
              handleSector: this.handleSector,
              sector: this.state.user.sector
            }}
          >
            <WithModalPreferences
              isOpen={this.state.show && this.state.currentModal === "pref"}
              handleClose={this.handleClose}
              title="Preferences"
              sectors={this.state.sectors}
              isFormValid={true}
              handleSubmit={this.handleSubmitPreferences}
            />
          </PreferencesContext.Provider>

          <WithModalReport
            isOpen={this.state.show && this.state.currentModal === "report"}
            handleClose={this.handleClose}
            title="Report"
            isFormValid={this.state.isFormValid}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            entry={this.state.entry}
            sectors={this.state.sectors}
          />

          {this.props.children}
        </Container>
      </Router>
    );
  }

  isLogged() {
    this.setState({
      isLogged: this.state.user && this.state.user.id
    });
  }
}

App.contextType = PreferencesContext;

export default App;
