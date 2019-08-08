import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';
import './btn.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      password: '', 
      redirect: false,
      message: '', 
    };
    this.service = new AuthService();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.service.login(email, password)
      .then(response => {
        this.setState({ email: "", password: "", redirect: true });
        this.props.getUser(response)
      })
      .catch(error => this.setState({ message: error.response.data.message }))

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home"></Redirect>
    }
    return (

      <div className="row">
        <div className="login-side">
        </div>
        <div className="container d-flex justify-content-end auth-login-custom login-side">
          <div className="col-lg-6 login-form">
            <form onSubmit={(event) => this.handleFormSubmit(event)}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
              </div>

              <input className="btn btn-custom text-uppercase" type="submit" value="Login" />

            </form>
            {
              this.state.message ?
                <p style={{ color: "red" }}>{this.state.message}</p>
                :
                null
            }
            <small className="form-text text-muted">
              Don't have account?
            <Link to={"/signup"}> Signup</Link>
            </small>
          </div>
        </div>
      </div>

    )
  }
}
export default Login;