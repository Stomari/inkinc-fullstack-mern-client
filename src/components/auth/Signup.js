import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

//Components
import Role from './Role';
import Form from './Form';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', name: '', role: '', class:"" };
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
      showForm: !this.state.showForm,
      classe: 'displayBtn'
    });
  }

  render(){
    return(
      <div>
      <Role handleChange={e => this.handleChange(e)} state={this.state}/>

      {  this.state.showForm ? 
        <Form handleChange={e => this.handleChange(e)} state={this.state} ></Form>
        : null
      }
    </div>
    )
  
}
}
export default Signup;
