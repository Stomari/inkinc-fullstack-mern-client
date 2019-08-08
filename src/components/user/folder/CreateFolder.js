import React, { Component } from 'react';
import axios from 'axios';


class CreateFolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    axios.post(`${process.env.REACT_APP_API_URL}/api/create-folder`, { name }, { withCredentials: true })
      .then(() => {
        this.props.foldersInfo();
        this.setState({ name: '' });
      })
      .catch(err => this.setState({ message: err.response.data.message }));

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    return (
      <div>
        <img src="/images/plus-circle-solid.svg" className="btn-create" data-toggle="modal" data-target="#exampleModal"/>
        <div className="modal fade modal-color" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Folder</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <p> Folder Name </p>
                  <input type='text' name='name' value={this.state.name} onChange={event => this.handleChange(event)} />
                </div>
                {
                  this.state.message ?
                    <p style={{ color: "red", paddingLeft: "10px" }}> {this.state.message} </p>
                    :
                    null
                }
                <div className="modal-footer">
                  <button type="submit" className="btn btn-secondary" onClick={event => this.handleFormSubmit(event)}>CREATE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateFolder;