import React, { Component } from 'react';
import axios from 'axios';

class EditArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.state.artist.name,
      about: this.props.state.artist.about,
      category: this.props.state.artist.category,
    }
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }

  handleChangeCheckbox(event) {
    const { value } = event.target;
    let newCategory = [...this.state.category];
    if (newCategory.some(cat => cat === value)) {
      newCategory = newCategory.filter(el => el !== value)
    } else {
      newCategory.push(value);
    }
    this.setState({ category: newCategory });
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
    axios.put('http://localhost:8000/api/edit-artist', this.state, { withCredentials: true })
      .then(() => {
        this.props.getArtist();
        this.props.handleShowEditProfile();

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.handleShowEditProfile()}>Edit Profile</button>
        {
          this.props.showEditProfileForm &&
          <div className="modal-wrapper">
            <span className="close-modal-btn" onClick={(e) => this.handleCloseModal(e)}></span>
            <form onSubmit={(event) => this.handleFormSubmit(event)} className="form-modal">
              <label>Name:</label>
              <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
              <label>About:</label>
              <input type="text" name="about" value={this.state.about} onChange={(event) => this.handleChange(event)} />
              <label>Category:</label>
              {
                this.props.categories.map((el, idx) => {
                  let check = false;
                  if (this.state.category.some(cat => cat === el.tag)) check = true;
                  return (
                    <div key={idx}>
                      <input id={el.tag} type="checkbox" name="category" value={el.tag} checked={check} onChange={(event) => this.handleChangeCheckbox(event)} />
                      <label htmlFor={el.tag}>{el.tag}</label>
                    </div>
                  )
                })
              }
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