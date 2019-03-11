import React from "react";
import { Redirect } from "react-router-dom";
import { fetch_reports, fetch_sectors } from "../utils/utils";
import Report from "../components/Report";
import Loader from "../components/Loader";

class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      reports: []
    };
  }
  componentDidMount() {
    const { isValidLogin } = this.props;
    if (isValidLogin) {
      setTimeout(async () => {
        const reports = await fetch_reports();
        const sectors = await fetch_sectors();
        this.setState({
          reports: reports,
          sectors: sectors
        });
      }, 1000);
    }
  }
  render() {
    const { isValidLogin } = this.props;
    const reports = this.parseReports(this.state.reports, this.state.sectors);

    if (!isValidLogin) {
      return <Redirect to="/" />;
    }
    return reports && reports.length > 0 ? (
      reports
    ) : (
      <Loader>
        <div className="overlay">
          <h1>Loading reports...</h1>
        </div>
      </Loader>
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
}

export default Dashboard;
