import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

//Components
import Role from './Role';
import Form from './Form';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { 
      email: '', 
      password: '', 
      name: '', 
      role: '', 
      class: '', 
      workplace: [], 
      showForm: false, 
      showWorkplace: false,
      output: [],
      newOutput: [],
    };
    this.service = new AuthService();
  }

  handleFormSubmit(event){
    event.preventDefault();
    
    const {email, password, name, role, workplace} = this.state;
    this.service.signup(email, password, name, role, workplace)
    .then( response => {
        this.setState({
            email:'', 
            password: '',
            name: '',
            role: '',
            workplace: [],
            shorForm: false,
            showWorkplace: false
        });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  handleChange(event){  
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleForm(event){
    const {name, value} = event.target;
    this.setState({
      showForm: !this.state.showForm,
      classe: 'displayBtn',
      [name]: value,
    });
  }

  handleWorkplace(event){
    const {name, value} = event.target;
    this.setState({
      showWorkplace: !this.state.showWorkplace
    });
  }

  placeHandler(value) {
    this.setState({
      workplace: value,
    })
  }


  render(){
    return(
      <div>
      <Role handleForm={e => this.handleForm(e)} state={this.state}/>

      {  this.state.showForm ? 
        <Form placeHandler={(value) => this.placeHandler(value)} handleChange={e => this.handleChange(e)} handleWorkplace={e => this.handleWorkplace(e)} handleFormSubmit={e => this.handleFormSubmit(e)} state={this.state} />
        : null
      }
    </div>
    )
  
}
}
export default Signup;
