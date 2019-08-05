import React, {Component} from 'react';
import Header from '../user/Header';
import Categories from './Categories';
import axios from 'axios';
import Map from './Map';
import Flashes from './Flashes';
import ArtistGallery from './ArtistGallery';

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
  }

  componentDidMount() {
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
    console.log('clicou');
    this.setState({
      showCreateTattooForm: !this.state.showCreateTattooForm,
    })
  }
  handleShowCreateFlash() {
    console.log('clicou flash');
    this.setState({
      showCreateFlashForm: !this.state.showCreateFlashForm,
    })
  }

  render() {
    return(
      this.state.flag ?
      <div>
        {/* <Header user={this.props.user} artist={this.state.artist} /> */}
        <Categories user={this.props.user} categories={this.state.categories} artist={this.state.artist} />
        <Map user={this.props.user} artist={this.state.artist} />
        <Flashes user={this.props.user} artist={this.state.artist} showForm={this.state.showCreateFlashForm} handlerShowForm={() => this.handleShowCreateFlash()} />
        <ArtistGallery user={this.props.user} artist={this.state.artist} showForm={this.state.showCreateTattooForm} handlerShowForm={() => this.handleShowCreateTattoo()}  />
      </div>
      : null
    )
  }
}

export default ArtistPage;
