import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';
import './btn.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit(event){
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.service.login(email, password)
      .then(response => {
        this.setState({ email: "", password: "", redirect: true });
        this.props.getUser(response)

      })
      .catch(error => console.log(error))
      
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/home"></Redirect>
    }
    return (
      <div className="container d-flex justify-content-center auth-custom">
        <div className="col-lg-6">
          <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <div className="form-group">
              <label for="email">Email:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
            </div>
            <div className="form-group"> 
              <label for="password">Password:</label>
              <input type="password"  class="form-control" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </div>
              <input class="btn btn-custom" type="submit" value="Login" />
          </form>
          <small className="form-text text-muted">
            Don't have account?
            <Link to={"/signup"}> Signup</Link>
          </small>
        </div>
      </div>
    )
  }
}
export default Login;