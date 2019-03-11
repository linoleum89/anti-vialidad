import React from "react";
import { Redirect } from 'react-router'
import { Form, Button } from "react-bootstrap";
import "../css/Login.css";

class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { validated: false, userName: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps){
    //reset form status
    if (prevProps.isValidLogin === null && this.props.isValidLogin === false) {
      this.setState({ validated: false });
   }
  }

  handleChange(ev) {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  handleSubmit(ev) {
    const form = ev.currentTarget;
    const {handleSubmitLogin} = this.props;
    ev.preventDefault();
    ev.stopPropagation();
    if (form.checkValidity()) {
      handleSubmitLogin({userName: this.state.userName, password: this.state.password});
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    const {isValidLogin} = this.props;

    if (isValidLogin) {
      return <Redirect to='/dashboard' />
    }

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <h1>Login</h1>
        <Form.Group controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Username" onChange={this.handleChange} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={this.handleChange} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <h3>{(!isValidLogin && isValidLogin !== null) ? 'Invalid user' : null }</h3>
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
}

export default Login;
