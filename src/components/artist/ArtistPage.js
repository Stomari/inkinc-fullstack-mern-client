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
      categories: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        const categories = response.data;
        this.setState({
          categories,
        })
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return(
      <div>
        <Header user={this.props.user} />
        <Categories user={this.props.user} categories={this.state.categories} />
        <Map user={this.props.user} />
        <Flashes user={this.props.user} />
        <ArtistGallery user={this.props.user} />
      </div>
    )
  }
}

export default ArtistPage;
