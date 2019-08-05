import React, {Component} from 'react';
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
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleChangeCheckbox(event) {
    const {value} = event.target;
    const newCategory = [...this.state.category];
    newCategory.push(value);
    this.setState({category: newCategory});
  }

  // upload file
  handleFileUpload(e) {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);
    axios.post('http://localhost:8000/api/upload', uploadData, {withCredentials: true})
      .then(response => {
        console.log('UPLOAD');
          this.setState({ image: response.data.secure_url });
        })
      .catch(err => console.log(err));
  }

  // this method submits the form
  handleFormSubmit(e) {
      e.preventDefault();
      if (this.state.image !== '') {
        axios.post('http://localhost:8000/api/add-tattoo', this.state, {withCredentials: true})
        .then(() => {
          console.log('XABLAU')
          this.setState({tag: '', image: '', category: []});
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
    return(
      <div className="modal-wrapper">
        <span className="close-modal-btn" onClick={() => this.handleCloseModal()}></span>
        <form onSubmit={(event) => this.handleFormSubmit(event)} className="form-modal">
          <label>Tags:</label>
          <input type="text" name="tag" value={this.state.tag} placeholder="Separate tags by comma (ex.: skull, fish, triangle)" onChange={ (event) => this.handleChange(event)}/>
          <label>Category:</label>
          {this.props.categories.map((el, idx) => {
            const check = (this.state.category.includes(el._id)) ? true : false
            return  (
              <div key={idx}>
                <input type="checkbox" id={"tattoo-" + el.tag} name="category" value={el._id} onChange={ (event) => this.handleChangeCheckbox(event)} checked={check}/>
                <label htmlFor={"tattoo-" + el.tag}>{el.tag}</label>
              </div>
            )
          })}
          <label>Image:</label>        
          <input type="file" name="image" onChange={(e) => this.handleFileUpload(e)} ref={ref=> this.fileInput = ref} /> 
          
          <input type="submit" value="Submit" />

        </form>
        <div className="modal-bg" onClick={() => this.handleCloseModal()}></div>
      </div>
    )
  }
}

export default CreateTattooForm;