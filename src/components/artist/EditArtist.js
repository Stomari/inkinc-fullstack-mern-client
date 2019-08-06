import React, {Component} from 'react';
import axios from 'axios';

class EditArtist extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: this.props.state.artist.name,
      about: this.props.state.artist.about,
      category: this.props.state.artist.category,
    }
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    })
  }

  handleCloseModal() {
    this.props.handleShowEditProfile();
    this.setState({
      name: this.props.state.artist.name,
      about: this.props.state.artist.about,
      category: this.props.state.artist.category,
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios.put('http://localhost:8000/api/edit-artist', this.state, {withCredentials: true})
      .then(() => {
        this.props.getArtist();
        this.props.handleShowEditProfile();

      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <button onClick={() => this.props.handleShowEditProfile()}>Edit Profile</button>
        {
          this.props.showEditProfileForm && 
          <div className="modal-wrapper">
          <span className="close-modal-btn" onClick={(e) => this.handleCloseModal(e)}></span>
          <form onSubmit={(event) => this.handleFormSubmit(event)} className="form-modal">
            <label>Name:</label>
            <input type="text" name="name" value={this.state.name} onChange={ (event) => this.handleChange(event)}/>
            <label>About:</label>
            <input type="text" name="about" value={this.state.about} onChange={ (event) => this.handleChange(event)}/>
            <label>Category:</label>
            <input type="submit" value="Submit" />
  
          </form>
          <div className="modal-bg" onClick={(e) => this.handleCloseModal(e)}></div>
        </div>
        }
      </div>
    )
  }

}

export default EditArtist;