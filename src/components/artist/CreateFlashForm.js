import React, { Component } from 'react';
import axios from 'axios';

class CreateFlashForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      image: '',
      category: [],
      price: ''
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

  // this method handles just the file upload
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
      axios.post(`${process.env.REACT_APP_API_URL}/api/add-flash`, this.state, { withCredentials: true })
        .then(() => {
          this.setState({ tag: '', image: '', category: [], price: '' });
          this.fileInput.value = '';
          this.props.handlerShowForm();
        })
        .catch(err => {
        });
    }
  }


  handleCloseModal() {
    this.props.handlerShowForm();
  }

  render() {
    return(      
      <div className="modal-wrapper">
        <span className="close-modal-btn" onClick={() => this.handleCloseModal()}></span>
        <form onSubmit={(event) => this.handleFormSubmit(event)} className="form-modal">
          <label>Tags:</label>
          <input type="text" name="tag" value={this.state.tag} placeholder="Separate tags by comma (ex.: skull, fish, triangle)" onChange={(event) => this.handleChange(event)} />
          <label>Category:</label>
          {this.props.categories.map((el, idx) => {
            const check = (this.state.category.includes(el._id)) ? true : false
            return (
              <div key={idx}>
                <input type="checkbox" id={"flash-" + el.tag} name="category" value={el._id} onChange={(event) => this.handleChangeCheckbox(event)} checked={check} />
                <label htmlFor={"flash-" + el.tag}>{el.tag}</label>
              </div>
            )
          })}
          <label>Image:</label>
          <input type="file" name="image" onChange={(e) => this.handleFileUpload(e)} ref={ref => this.fileInput = ref} />
          {this.state.image !== '' && <img src={this.state.image} alt='upload' width="200" />}
          <label>Price:</label>
          <input type="text" name="price" value={this.state.price} placeholder="Ex.: 300.00" onChange={(event) => this.handleChange(event)} />

          <input type="submit" value="Submit" />

        </form>
        <div className="modal-bg" onClick={() => this.handleCloseModal()}></div>
      </div>
    )
  }
}

export default CreateFlashForm;