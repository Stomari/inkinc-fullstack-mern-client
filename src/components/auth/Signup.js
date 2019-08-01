import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

//Components
import Role from './Role';
class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', name: '', role: '' };
    this.service = new AuthService();
  }

  handleFormSubmit(event){
    event.preventDefault();
    const {email, password, name, role} = this.state;
    this.service.signup(email, password, name, role)
    .then( response => {
        this.setState({
            email:'', 
            password: '',
            name: '',
            role: '',
            shorForm: false
        });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  handleChange(event){  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
      showForm: !this.state.showForm
    });
  }


  render(){
    return(
      <div>
      <Role handleChange={ e => this.handleChange(e)}/>

      {  this.state.showForm ? 
      <div>
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
            
            <label>Password:</label>
            <input type="password"  name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            
            <label> Name:</label>
            <input type="text"  name="name" value={this.state.name} onChange={ e => this.handleChange(e)} />

            <input type="submit" value="Signup" />
        </form>
        <p>
          Already have account? 
          <Link to={"/login"}> Login </Link>
        </p>
      </div>
        : null
      }
    </div>
    )
  
}
}
export default Signup;
