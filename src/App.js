import React, { Component } from "react";
import "./css/App.css";
import { Button, Container, Row, Navbar, ButtonGroup } from "react-bootstrap";
import Login from "./components/Login";
import Preferences from "./components/Preferences";
import Report from "./components/Report";
import ReportForm from "./components/ReportForm";
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

    this.state = {
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
      },
      sectors: [],
      entries: []
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
    //simulating some api fetch retriveing sectors and entries
    setTimeout(() => {
      this.setState({
        sectors: [
          { id: "1", name: "San Felipe", className: "red" },
          { id: "2", name: "Fuentes Mares", className: "blue" }
        ],
        entries: [
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
          },
          {
            id: 3,
            name: "Policía cazando en la fuentes mares",
            description: "Pasando el Soriana",
            coordinates: [],
            sector: 2
          },
          {
            id: 4,
            name: "Policía esconcido atrás de avalos",
            description: "Pasando el Soriana",
            coordinates: [],
            sector: 0
          }
        ]
      });
    }, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async handleSubmitLogin(userData = {}) {
    //send userData to api login service, simulating call here
    const user = (await login(userData)) || "";
    this.setState({
      isValidLogin: typeof user === "object",
      user: user && typeof user !== "string" ? user : {}
    });
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

  render() {
    const entries = this.getEntries(this.state.entries, this.state.sectors);
    return (
      <Container fluid={true}>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Anti-Vialidad{" "}
            {this.state.user &&
              this.state.user.userName &&
              `| Welcome ${this.state.user.userName}`}
          </Navbar.Brand>
          <ButtonGroup>
            <Button variant="info" name="sectors" onClick={this.handleShow}>
              Sectors
            </Button>
            <Button variant="danger" name="report" onClick={this.handleShow}>
              Report
            </Button>
            <Button variant="primary" name="pref" onClick={this.handleShow}>
              Preferences
            </Button>
          </ButtonGroup>
        </Navbar>
        {/* <Row className="margin-top">{(entries && entries.length > 0) ? entries : <h1>Loading...</h1>}</Row> */}
        <Row className="margin-top">
          <Login handleSubmitLogin={this.handleSubmitLogin} isValidLogin={this.state.isValidLogin} />
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
    );
  }

  isLogged() {
    this.setState({
      isLogged: this.state.user && this.state.user.id
    });
  }

  getEntries(entries = [], sectors = []) {
    return (
      entries &&
      entries.map(entry => {
        const sector = sectors.find(sector => {
          return parseInt(sector.id) === entry.sector;
        });

        entry.className = (sector && sector.className) || "";

        return <Report key={entry.name} {...entry} />;
      })
    );
  }
}

App.contextType = PreferencesContext;

export default App;
