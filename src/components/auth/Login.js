import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';

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
    console.log(email, password)
    this.service.login(email, password)
      .then(response => {
        this.props.getUser(response)
        this.setState({ email: "", password: "", redirect: true });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={"/"}></Redirect>
    }
    return (
      <div>
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <label>email:</label>
          <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Login" />

        </form>
        <p>Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}
export default Login;