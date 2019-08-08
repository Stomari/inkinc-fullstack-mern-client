import React, { Component } from 'react';
import AuthService from './auth-service';
import { Redirect } from 'react-router-dom';

//Components
import Role from './Role';
import Form from './Form';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      role: '',
      classeCli: '',
      classeArt: '',
      workplace: [],
      showForm: false,
      showWorkplace: false,
      output: [],
      newOutput: [],
      message: '',
      redirect: false,
    };
    this.service = new AuthService();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { email, password, name, role, workplace } = this.state;
    this.service.signup(email, password, name, role, workplace)
      .then(response => {
        this.setState({
          email: '',
          password: '',
          name: '',
          role: '',
          workplace: [],
          shorForm: false,
          showWorkplace: false,
          redirect: true,
        });
        this.props.getUser(response)
      })
      .catch(error => this.setState({ message: error.response.data.message }))
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleForm(event) {
    const { name, value } = event.target;
    this.setState({
      showForm: true,
      classeCli: 'displayBtn',
      [name]: value,
    });
  }

  handleClass(event) {
    const { name, value } = event.target;
    this.setState({
      showForm: true,
      classeArt: 'displayBtn',
      [name]: value,
    });
  }

  handleWorkplace(event) {
    this.setState({
      showWorkplace: !this.state.showWorkplace
    });
  }

  placeHandler(value) {
    this.setState({
      workplace: value,
    })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to="/home"></Redirect>
    }
    return (
      <div className="container d-flex justify-content-center auth-custom flex-wrap">

        <Role handleForm={e => this.handleForm(e)} handleClass={e => this.handleClass(e)} state={this.state} />

        {this.state.showForm ?
          <Form placeHandler={(value) => this.placeHandler(value)} handleChange={e => this.handleChange(e)} handleWorkplace={e => this.handleWorkplace(e)} handleFormSubmit={e => this.handleFormSubmit(e)} state={this.state} />
          : null
        }
      </div>
    )

  }
}
export default Signup;
