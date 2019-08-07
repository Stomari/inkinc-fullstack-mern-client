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
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Add Folder
        </button>

        <div class="modal fade modal-color" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p> Folder Name </p>
              <input type='text' name='name' value={this.state.name} onChange={ event => this.handleChange(event)}/>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-secondary" onClick={event => this.handleFormSubmit(event)} data-dismiss="modal">CREATE</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateFolder;