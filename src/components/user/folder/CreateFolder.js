import React, { Component } from 'react';
import axios from 'axios';


class CreateFolder extends Component {
  constructor(props){
    super(props)
    this.state={
      name: ''
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    axios.post('http://localhost:8000/api/create-folder', { name }, { withCredentials: true })
      .then(() => {
        this.props.foldersInfo();
        this.setState({name: ''});
      })
      .catch(err => console.log(err));

    }

  handleChange(event){  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  
  render(){
    return(
      <div>
        <input type='text' name='name' value={this.state.name} onChange={ event => this.handleChange(event)}/>
        <button onClick={event => this.handleFormSubmit(event)}>Create</button>
      </div>
    )
  }
}

export default CreateFolder;