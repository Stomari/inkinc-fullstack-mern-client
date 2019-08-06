import React, {Component} from 'react';
import Header from '../user/Header';
import Categories from './Categories';
import axios from 'axios';
import Map from './Map';
import Flashes from './Flashes';
import ArtistGallery from './ArtistGallery';
import AuthService from '../auth/auth-service';

class ArtistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      artist: '',
      flag: false,
      showCreateTattooForm: false,
      showCreateFlashForm: false,
    };
    this.service = new AuthService();
  }

  getArtist() {
    axios.get(`http://localhost:8000/api/artists/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          artist: response.data,
        })
        axios.get('http://localhost:8000/api/categories')
          .then(response => {
            const categories = response.data;
            this.setState({
              categories,
              flag: true
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getArtist();
  }

  componentWillReceiveProps(newProps) {
    axios.get(`http://localhost:8000/api/artists/${newProps.match.params.id}`)
      .then(response => {
        this.setState({
          artist: response.data,
        })
      })
      .catch(err => console.log(err));
  }

  handleShowCreateTattoo() {
    this.setState({
      showCreateTattooForm: !this.state.showCreateTattooForm,
    })
  }
  
  handleShowCreateFlash() {
    this.setState({
      showCreateFlashForm: !this.state.showCreateFlashForm,
    })
  }

  handleDeleteFlash(event, id) {
    event.preventDefault();
    axios.put(`http://localhost:8000/api/remove-flash/${id}`, {}, {withCredentials: true})
      .then(() => {
        this.getArtist();
      })
      .catch(err => console.log(err));
  }

  handleDeleteTattoo(event, id) {
    event.preventDefault();
    axios.put(`http://localhost:8000/api/remove-tattoo/${id}`, {}, {withCredentials: true})
      .then(() => {
        this.getArtist();
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      this.state.flag ?
      <div className="container">
        {/* <Header user={this.props.user} artist={this.state.artist} /> */}
        <Categories user={this.props.user} categories={this.state.categories} artist={this.state.artist} />
        <Map user={this.props.user} artist={this.state.artist} />
        <Flashes
          user={this.props.user}
          artist={this.state.artist}
          categories={this.state.categories}
          showForm={this.state.showCreateFlashForm}
          handlerShowForm={() => this.handleShowCreateFlash()}
          handleDeleteFlash={(e, id) => this.handleDeleteFlash(e, id)}
          getArtist={() => this.getArtist()}
        />
        <ArtistGallery
          user={this.props.user}
          artist={this.state.artist}
          categories={this.state.categories}
          showForm={this.state.showCreateTattooForm}
          handlerShowForm={() => this.handleShowCreateTattoo()}
          handleDeleteTattoo={(e, id) => this.handleDeleteTattoo(e, id)}
          getArtist={() => this.getArtist()}
        />
      </div>
      : null
    )
  }
}

export default ArtistPage;
