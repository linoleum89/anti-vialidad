import React from "react";
import { Form } from "react-bootstrap";
import DataContext from "../data-context";
import '../css/component-custom-switch.min.css';

const Preferences = props => {
    const sectors = props.sectors && props.sectors.map((sector) => {
        return (<option key={sector.name} value={sector.id}>{sector.name}</option>);
    });
  return (
    <DataContext.Consumer>
      {context => (
        <React.Fragment>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Notifications</Form.Label>
            <div className="custom-switch custom-switch-label-io">
              <input
                className="custom-switch-input"
                id="notifications_switch"
                type="checkbox"
                checked={context.allowNotifications}
                onChange={context.handleNotifications}
              />
              <label
                className="custom-switch-btn"
                htmlFor="notifications_switch"
              />
            </div>
            <br />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sector: </Form.Label>
            <Form.Control
            as="select"
              name="sector"
              value={context.sector}
              onChange={context.handleSector}
            >
            {sectors}
            </Form.Control>
          </Form.Group>
        </React.Fragment>
      )}
    </DataContext.Consumer>
  );
};

export default Preferences;
