import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';

class CreateTattooForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      image: '',
      category: [],
    }
  }

  componentWillUnmount() {
    this.props.getArtist()
  }


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeCheckbox(event) {
    const { value } = event.target;
    let newCategory = [...this.state.category];
    if (newCategory.includes(value)) {
      newCategory = newCategory.filter(el => el !== value)
    } else {
      newCategory.push(value);
    }
    this.setState({ category: newCategory });
  }

  // upload file
  handleFileUpload(e) {
    this.setState({
      image: 'https://media.tenor.com/images/80cb16bb74ed9027ea1b25d077ce6d97/tenor.gif'
    });
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);
    axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, { withCredentials: true })
      .then(response => {
        this.setState({ image: response.data.secure_url });
      })
      .catch(err => console.log(err));
  }

  // this method submits the form
  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.image !== '') {
      axios.post(`${process.env.REACT_APP_API_URL}/api/add-tattoo`, this.state, { withCredentials: true })
        .then(() => {
          this.setState({ tag: '', image: '', category: [] });
          this.fileInput.value = '';
          this.props.handlerShowForm();
        })
        .catch(err => {
        });
    }
  }

  saveTattoo(newThing) {
    return this.service.post('/add-tattoo', newThing)
      .then(res => res.data)
  }

  handleCloseModal() {
    this.props.handlerShowForm();
  }

  render() {
    return (
      <div className="modal-wrapper">
        <span className="close-modal-btn" onClick={() => this.handleCloseModal()}></span>
        <form onSubmit={(event) => this.handleFormSubmit(event)} className="form-modal">
          <label className="text-uppercase label-cat">Tags:</label>
          <input type="text" name="tag" value={this.state.tag} placeholder="Separate tags by comma (ex.: skull, rose, triangle)" onChange={(event) => this.handleChange(event)} />
          <label className="text-uppercase label-cat">Category:</label>
          <div className="categories-container">
          <MediaQuery maxWidth={500}>
        {(matches) => {
          if (matches) {
            return <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle dropdown-modal" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                      </button>
                      <div className="dropdown-menu container-dropdown text-center" aria-labelledby="dropdownMenu2">
                      {
                        this.props.categories.map((el, idx) => {
                        return (
                          <div key={idx} className="category-container">
                            <input type="checkbox" id={el._id} value={el.id} onChange={(event) =>this.handleChangeCheckbox(event)} />
                            <label htmlFor={el._id}>{el.tag}</label>
                          </div>
                          );
                        })
                      }
                      </div>
                    </div>

          } else {
          return  this.props.categories.map((el, idx) => {
            // const check = (this.state.category.includes(el._id)) ? true : false
            return (
              <div key={idx} className="category-container">
                <input type="checkbox" id={"tattoo-" + el.tag} name="category" value={el._id} onChange={(event) => this.handleChangeCheckbox(event)} />
                <label htmlFor={"tattoo-" + el.tag}>{el.tag}</label>
              </div>
            )
          })
        }}
    }

        </MediaQuery>
          </div>
          <label className="text-uppercase label-cat">Image:</label>
          <input type="file" name="image" onChange={(e) => this.handleFileUpload(e)} ref={ref => this.fileInput = ref} />
          {this.state.image !== '' && <img src={this.state.image} alt='upload' width="200" />}

          <input className="btn-submit align-self-center mt-4"type="submit" value="Add tattoo"/>

        </form>
        <div className="modal-bg" onClick={() => this.handleCloseModal()}></div>
      </div>
    )
  }
}

export default CreateTattooForm;