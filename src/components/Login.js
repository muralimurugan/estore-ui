import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchStore, deleteStore, setApiError } from '../redux/action'
import Alert from 'react-bootstrap/Alert'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3003/users/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        const jsondata = await res.json();
        console.log('res', jsondata)
        if (res.status === 200) {
          localStorage.setItem('jwt', jsondata.data.token);
          this.props.history.push("/dashboard");
        } else  {
          this.props.setApiError(jsondata.message)
        }
      })
      .catch(err => {
        console.error('err.msg',err);
        this.props.setApiError('User not found')
        // alert('Error logging in please try again');
      });
  }
  dismissAlert = () => {
    this.props.setApiError('');
    // this.props.history.push("/");
  }
  render() {
    return (
      <Form>
        {
          this.props && this.props.errorMessage && <Alert variant="danger" onClose={this.dismissAlert} dismissible>{this.props.errorMessage}</Alert>
        }
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
              </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={this.handleSubmit}>
          Submit
            </Button>
      </Form>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setApiError: (msg) => dispatch(setApiError(msg)),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));