import React from "react";
import { Form } from "react-bootstrap";

const Report = props => {
  const sectors =
    props.sectors &&
    props.sectors.map(sector => {
      return (
        <option key={sector.name} value={sector.id}>
          {sector.name}
        </option>
      );
    });
    
    sectors.unshift(<option key='none' value={0}>None</option>);

  return (
    <React.Fragment>
      <p>(*) Required fields</p>
      <Form.Group>
        <Form.Label>*Name: </Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          value={props.entry.name}
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>*Description: </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="description"
          placeholder="Enter description"
          value={props.entry.description}
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sector: </Form.Label>
        <Form.Control
          as="select"
          name="sector"
          placeholder="Enter sector"
          value={props.entry.sector}
          onChange={props.handleChange}
        >
          {sectors}
        </Form.Control>
      </Form.Group>
    </React.Fragment>
  );
};

export default Report;
