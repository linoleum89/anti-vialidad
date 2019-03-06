import React from "react";
import PropTypes from 'prop-types';
import { Card, Button, Col } from "react-bootstrap";

const Report = props => {
  return (
    <Col md="auto">
      <Card className={props.className}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          {props.coordinates && props.coordinates.length > 0 && (
            <Button coordinates={props.coordinates} variant="primary">
              Open map
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

Report.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  coordinates: PropTypes.array
} 

export default Report;
