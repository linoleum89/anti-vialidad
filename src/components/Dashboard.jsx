import React from "react";
import { Redirect } from "react-router-dom";
import { fetch_reports, fetch_sectors } from "../utils/utils";
import Report from "../components/Report";
import Loader from "../components/Loader";
import PreferencesContext from "../data-context";

class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isFetched: false,
      isLoading: false,
      reports: [],
      sectors: []
    };
  }
  componentDidMount() {
    const { isValidLogin } = this.props;
    if (isValidLogin) {
      this.setState({
        isLoading: true
      });
    }
  }

  render() {
    const { isValidLogin, data = {} } = this.props;

    if (!isValidLogin) {
      return <Redirect to="/" />;
    }

    if ((data.reports && data.reports.length > 0) && (data.sectors && data.sectors.length > 0)) {
        const reports = this.parseReports(data.reports, data.sectors) || [];
        return reports;
    }

    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Loader>
            <div className="overlay">
              <h1>Loading reports...</h1>
            </div>
          </Loader>
        ) : null}
        <PreferencesContext.Consumer>
          {context => this.fetchData(context.getData)}
        </PreferencesContext.Consumer>
      </React.Fragment>
    );
  }

  parseReports(reports = [], sectors = []) {
    return (
      reports &&
      reports.map(report => {
        const sector = sectors.find(sector => {
          return parseInt(sector.id) === report.sector;
        });

        report.className = (sector && sector.className) || "";

        return <Report key={report.name} {...report} />;
      })
    );
  }

  fetchData(callback) {
    const { isValidLogin } = this.props;
    if (isValidLogin && !this.state.isFetched) {
      this.timeout = setTimeout(async () => {
        const reports = await fetch_reports();
        const sectors = await fetch_sectors();
        callback({ reports, sectors });
        this.setState({
          reports: reports,
          sectors: sectors,
          isFetched: true,
          isLoading: false
        });
        clearTimeout(this.timeout);
      }, 1000);
    }
    return this.parseReports(this.state.reports, this.state.sectors) || [];
  }
}

export default Dashboard;
